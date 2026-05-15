import { loadManifest, paths, syncManifestExports } from './asset-utils.mjs';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const checkOnly = args.has('--check');

async function main() {
  const manifest = await loadManifest(paths.manifest);
  const report = await syncManifestExports(manifest, { dryRun: dryRun || checkOnly });

  if (report.copied.length > 0) {
    console.log(`${dryRun || checkOnly ? 'Would sync' : 'Synced'} ${report.copied.length} asset file(s).`);
    for (const item of report.copied) {
      console.log(`- ${item.source} -> ${item.destination}`);
    }
  }

  if (report.missing.length > 0) {
    console.log(`Missing ${report.missing.length} manifest export file(s).`);
    for (const item of report.missing) {
      console.log(`- ${item}`);
    }
  }

  if (checkOnly && report.missing.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
