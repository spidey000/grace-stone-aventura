import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));

export const paths = {
  repoRoot,
  manifest: path.join(repoRoot, 'ai-assets/manifests/oceanografic-ui-pack.json'),
  publicAssetsDir: path.join(repoRoot, 'public/assets'),
  publicAudioFxDir: path.join(repoRoot, 'public/audio/fx'),
  aiExportsDir: path.join(repoRoot, 'ai-assets/exports'),
  aiSourcesDir: path.join(repoRoot, 'ai-assets/sources'),
};

export function toPosix(value) {
  return value.replaceAll(path.sep, '/');
}

export function resolveRepoPath(inputPath) {
  if (path.isAbsolute(inputPath)) return inputPath;
  return path.join(repoRoot, inputPath);
}

export async function readJsonFile(filePath) {
  const raw = await fs.readFile(resolveRepoPath(filePath), 'utf8');
  return JSON.parse(raw);
}

export async function writeJsonFile(filePath, data) {
  const absolutePath = resolveRepoPath(filePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function loadManifest(filePath = paths.manifest) {
  return readJsonFile(filePath);
}

export async function saveManifest(manifest, filePath = paths.manifest) {
  await writeJsonFile(filePath, manifest);
}

export function findAsset(manifest, assetId) {
  const asset = manifest.assets?.find((entry) => entry.asset_id === assetId);
  if (!asset) {
    throw new Error(`Asset not found in manifest: ${assetId}`);
  }
  return asset;
}

export function relativeFromRepo(absolutePath) {
  return toPosix(path.relative(repoRoot, absolutePath));
}

export function resolveExportPath(exportPath) {
  const normalized = toPosix(exportPath);
  const prefix = 'ai-assets/exports/';
  if (!normalized.startsWith(prefix)) {
    throw new Error(`Export path must live under ${prefix}: ${exportPath}`);
  }
  return path.join(repoRoot, normalized);
}

export function resolveSourcePath(sourcePath) {
  const normalized = toPosix(sourcePath);
  const prefix = 'ai-assets/sources/';
  if (!normalized.startsWith(prefix)) {
    throw new Error(`Source path must live under ${prefix}: ${sourcePath}`);
  }
  return path.join(repoRoot, normalized);
}

export function runtimePathForExport(exportPath) {
  const normalized = toPosix(exportPath);
  const prefix = 'ai-assets/exports/';
  if (!normalized.startsWith(prefix)) {
    throw new Error(`Export path must live under ${prefix}: ${exportPath}`);
  }

  const relative = normalized.slice(prefix.length);
  const [family, ...rest] = relative.split('/');
  const filename = rest.join('/');

  if (!family || !filename) {
    throw new Error(`Invalid export path: ${exportPath}`);
  }

  if (family === 'audio') {
    const runtimeFileName = filename.replace(/^audio-/, '');
    return path.join(paths.publicAudioFxDir, runtimeFileName);
  }

  return path.join(paths.publicAssetsDir, family, filename);
}

export async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

export async function copyFile(sourcePath, destinationPath) {
  await ensureParentDir(destinationPath);
  await fs.copyFile(sourcePath, destinationPath);
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function syncManifestExports(manifest, { dryRun = false } = {}) {
  const report = {
    copied: [],
    missing: [],
  };

  for (const asset of manifest.assets || []) {
    for (const exportPath of asset.export_paths || []) {
      const source = resolveExportPath(exportPath);
      const destination = runtimePathForExport(exportPath);

      if (!(await fileExists(source))) {
        report.missing.push(relativeFromRepo(source));
        continue;
      }

      if (!dryRun) {
        await copyFile(source, destination);
      }

      report.copied.push({
        source: relativeFromRepo(source),
        destination: relativeFromRepo(destination),
      });
    }
  }

  return report;
}

export async function ingestDownloadedAsset(manifest, assetId, downloadedPath, options = {}) {
  const {
    exportIndex = 0,
    copyToSource = true,
    copyToPublic = true,
    markReady = true,
  } = options;

  const asset = findAsset(manifest, assetId);
  const exportPath = asset.export_paths?.[exportIndex];

  if (!exportPath) {
    throw new Error(`Asset ${assetId} does not define export path index ${exportIndex}`);
  }

  const absoluteDownload = resolveRepoPath(downloadedPath);
  if (!(await fileExists(absoluteDownload))) {
    throw new Error(`Downloaded file not found: ${downloadedPath}`);
  }

  const exportDestination = resolveExportPath(exportPath);
  await copyFile(absoluteDownload, exportDestination);

  const runtimeDestination = runtimePathForExport(exportPath);
  if (copyToPublic) {
    await copyFile(absoluteDownload, runtimeDestination);
  }

  let sourceDestination = null;
  if (copyToSource && asset.source_path) {
    const sourceBase = resolveSourcePath(asset.source_path);
    const sourceFileName = path.basename(exportDestination);
    sourceDestination = path.join(sourceBase, sourceFileName);
    await copyFile(absoluteDownload, sourceDestination);
  }

  if (markReady) {
    asset.status = 'ready';
    asset.updated_at = new Date().toISOString();
    asset.last_exported_at = asset.updated_at;
  }

  return {
    assetId,
    exportPath: relativeFromRepo(exportDestination),
    sourcePath: sourceDestination ? relativeFromRepo(sourceDestination) : null,
    runtimePath: relativeFromRepo(runtimeDestination),
  };
}
