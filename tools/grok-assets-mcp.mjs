import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod/v4';

import {
  ingestDownloadedAsset,
  loadManifest,
  paths,
  relativeFromRepo,
  saveManifest,
  syncManifestExports,
} from '../scripts/assets/asset-utils.mjs';

const repoRoot = paths.repoRoot;
const camoufoxPython = process.env.CAMOUFOX_PYTHON || 'python3';
const camoufoxBridgeScript = path.join(repoRoot, 'tools/camoufox-bridge.py');
const camoufoxLibPath = process.env.CAMOUFOX_LD_LIBRARY_PATH || [
  path.join(process.env.HOME || '', '.local/camoufox-libs/usr/lib/x86_64-linux-gnu'),
  path.join(process.env.HOME || '', '.local/camoufox-libs/lib/x86_64-linux-gnu'),
]
  .filter(Boolean)
  .join(':');
const defaultGrokUrl = process.env.GROK_URL || 'https://grok.com/';
const defaultPromptSelector = process.env.GROK_PROMPT_SELECTOR || 'textarea, [contenteditable="true"]';
const defaultSubmitSelector = process.env.GROK_SUBMIT_SELECTOR || 'button[type="submit"]';
const defaultDownloadSelector = process.env.GROK_DOWNLOAD_SELECTOR || '';
const defaultHeadless = process.env.GROK_HEADLESS !== 'false';

const bridgeState = {
  child: null,
  buffer: '',
  nextId: 1,
  pending: new Map(),
  signature: null,
  headless: null,
};

function toText(value) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

function ensureBridgeEnv() {
  return {
    ...process.env,
    PYTHONUNBUFFERED: '1',
    CAMOUFOX_DOWNLOAD_ROOT: path.join(repoRoot, 'ai-assets/.tmp/downloads'),
    CAMOUFOX_HEADLESS: String(defaultHeadless),
    LD_LIBRARY_PATH: camoufoxLibPath,
  };
}

async function ensureDownloadRoot() {
  await fs.mkdir(path.join(repoRoot, 'ai-assets/.tmp/downloads'), { recursive: true });
}

async function stopBridge() {
  if (bridgeState.child) {
    bridgeState.child.kill('SIGTERM');
    bridgeState.child = null;
  }
  bridgeState.buffer = '';
  bridgeState.signature = null;
  bridgeState.headless = null;
  for (const [, pending] of bridgeState.pending) {
    pending.reject(new Error('Camoufox bridge stopped'));
  }
  bridgeState.pending.clear();
}

async function startBridge(options = {}) {
  const requestedHeadless = options.headless ?? defaultHeadless;
  const signature = JSON.stringify({
    python: camoufoxPython,
    script: camoufoxBridgeScript,
    headless: requestedHeadless,
  });

  if (bridgeState.child && bridgeState.signature === signature) {
    return bridgeState.child;
  }

  await stopBridge();
  await ensureDownloadRoot();

  const child = spawn(camoufoxPython, [camoufoxBridgeScript], {
    cwd: repoRoot,
    env: ensureBridgeEnv(),
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');

  child.stdout.on('data', (chunk) => {
    bridgeState.buffer += chunk;
    let newlineIndex = bridgeState.buffer.indexOf('\n');
    while (newlineIndex !== -1) {
      const line = bridgeState.buffer.slice(0, newlineIndex).trim();
      bridgeState.buffer = bridgeState.buffer.slice(newlineIndex + 1);
      newlineIndex = bridgeState.buffer.indexOf('\n');

      if (!line) continue;

      let payload;
      try {
        payload = JSON.parse(line);
      } catch (error) {
        continue;
      }

      const pending = bridgeState.pending.get(payload.id);
      if (!pending) continue;
      bridgeState.pending.delete(payload.id);
      if (payload.ok) {
        pending.resolve(payload.result);
      } else {
        const message = payload.error || 'Camoufox bridge command failed';
        const err = new Error(message);
        err.traceback = payload.traceback;
        pending.reject(err);
      }
    }
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  child.on('exit', (code) => {
    const error = new Error(code === 0 ? 'Camoufox bridge exited' : `Camoufox bridge exited with code ${code}`);
    for (const [, pending] of bridgeState.pending) {
      pending.reject(error);
    }
    bridgeState.pending.clear();
    bridgeState.child = null;
    bridgeState.signature = null;
  });

  bridgeState.child = child;
  bridgeState.signature = signature;
  bridgeState.headless = requestedHeadless;
  return child;
}

async function sendBridgeCommand(command) {
  const child = await startBridge(command);
  const id = bridgeState.nextId++;
  const payload = { id, ...command };

  return new Promise((resolve, reject) => {
    bridgeState.pending.set(id, { resolve, reject });
    child.stdin.write(`${JSON.stringify(payload)}\n`, (error) => {
      if (!error) return;
      bridgeState.pending.delete(id);
      reject(error);
    });
  });
}

function normalizeFilename(name) {
  const base = path.basename(name || '').trim();
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^\.+/, '');
  return cleaned || `download-${Date.now()}`;
}

const server = new McpServer({
  name: 'grace-stone-grok-assets',
  version: '2.0.0',
});

server.registerTool(
  'browser.open',
  {
    description: 'Open Grok in Camoufox.',
    inputSchema: z.object({
      url: z.string().url().optional(),
      headless: z.boolean().optional(),
    }),
  },
  async ({ url, headless }) => {
    const result = await sendBridgeCommand({
      cmd: 'open',
      url: url || defaultGrokUrl,
      headless: headless ?? defaultHeadless,
    });

    return {
      content: [
        {
          type: 'text',
          text: toText(result),
        },
      ],
    };
  },
);

server.registerTool(
  'browser.capture',
  {
    description: 'Capture the current Grok page as text and optional screenshot.',
    inputSchema: z.object({
      screenshotName: z.string().optional(),
      selector: z.string().optional(),
    }),
  },
  async ({ screenshotName, selector }) => {
    const result = await sendBridgeCommand({
      cmd: 'capture',
      selector,
      screenshot_name: screenshotName ? normalizeFilename(screenshotName) : undefined,
    });

    return {
      content: [
        {
          type: 'text',
          text: toText(result),
        },
      ],
    };
  },
);

server.registerTool(
  'browser.generate',
  {
    description: 'Generate an asset in Grok and save the resulting download.',
    inputSchema: z.object({
      prompt: z.string().min(1),
      url: z.string().url().optional(),
      promptSelector: z.string().optional(),
      submitSelector: z.string().optional(),
      downloadSelector: z.string().optional(),
      waitAfterSubmitMs: z.number().int().min(0).default(1500),
      downloadTimeoutMs: z.number().int().min(1000).default(180000),
      destinationName: z.string().optional(),
      assetId: z.string().optional(),
      exportIndex: z.number().int().min(0).default(0),
      copyToSource: z.boolean().default(true),
      copyToPublic: z.boolean().default(true),
      headless: z.boolean().optional(),
    }),
  },
  async (input) => {
    const result = await sendBridgeCommand({
      cmd: 'generate',
      url: input.url || defaultGrokUrl,
      headless: input.headless ?? defaultHeadless,
      prompt: input.prompt,
      prompt_selector: input.promptSelector || defaultPromptSelector,
      submit_selector: input.submitSelector || defaultSubmitSelector,
      download_selector: input.downloadSelector ?? defaultDownloadSelector,
      wait_after_submit_ms: input.waitAfterSubmitMs,
      download_timeout_ms: input.downloadTimeoutMs,
      destination_name: input.destinationName ? normalizeFilename(input.destinationName) : undefined,
    });

    const localDownloadPath = result.download_path;
    let ingestResult = null;
    if (input.assetId) {
      const manifest = await loadManifest();
      ingestResult = await ingestDownloadedAsset(manifest, input.assetId, localDownloadPath, {
        exportIndex: input.exportIndex,
        copyToSource: input.copyToSource,
        copyToPublic: input.copyToPublic,
      });
      await saveManifest(manifest);
    }

    return {
      content: [
        {
          type: 'text',
          text: toText({
            ...result,
            localDownloadPath: relativeFromRepo(path.join(repoRoot, localDownloadPath)),
            ingestResult,
          }),
        },
      ],
    };
  },
);

server.registerTool(
  'assets.ingest_download',
  {
    description: 'Copy a downloaded file into ai-assets and public runtime paths, then mark the manifest ready.',
    inputSchema: z.object({
      assetId: z.string().min(1),
      downloadedPath: z.string().min(1),
      exportIndex: z.number().int().min(0).default(0),
      copyToSource: z.boolean().default(true),
      copyToPublic: z.boolean().default(true),
    }),
  },
  async ({ assetId, downloadedPath, exportIndex, copyToSource, copyToPublic }) => {
    const manifest = await loadManifest();
    const result = await ingestDownloadedAsset(manifest, assetId, downloadedPath, {
      exportIndex,
      copyToSource,
      copyToPublic,
    });
    await saveManifest(manifest);

    return {
      content: [
        {
          type: 'text',
          text: toText(result),
        },
      ],
    };
  },
);

server.registerTool(
  'assets.sync_public',
  {
    description: 'Copy every manifest export into the runtime public folder.',
    inputSchema: z.object({
      dryRun: z.boolean().default(false),
    }),
  },
  async ({ dryRun }) => {
    const manifest = await loadManifest();
    const report = await syncManifestExports(manifest, { dryRun });
    return {
      content: [
        {
          type: 'text',
          text: toText(report),
        },
      ],
    };
  },
);

server.registerTool(
  'browser.close',
  {
    description: 'Close the Camoufox bridge process.',
    inputSchema: z.object({}),
  },
  async () => {
    await stopBridge();
    return {
      content: [
        {
          type: 'text',
          text: toText({ ok: true }),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    process.exitCode = 1;
  });
}
