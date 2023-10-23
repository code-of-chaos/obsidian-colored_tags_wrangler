// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
const dirname = path.dirname(fileURLToPath(import.meta.url))
// Define the version bump type ('full', 'change', 'fix')
const packageJsonPath = path.join(dirname, '../package.json');
const manifestJsonPath = path.join(dirname, '../manifest.json');

// Define the version bump type ('full', 'change', 'fix')
const versionBumpType = process.argv[2];

if (!['full', 'change', 'fix'].includes(versionBumpType)) {
	console.error('Invalid version bump type. Use one of: full, change, fix.');
	process.exit(1);
}

// Read the package.json file
fs.readFile(packageJsonPath, 'utf8', (err, packageData) => {
	if (err) {
		console.error('Error reading package.json:', err);
		process.exit(1);
	}

	try {
		const packageJson = JSON.parse(packageData);

		// Read the manifest.json file
		fs.readFile(manifestJsonPath, 'utf8', (err, manifestData) => {
			if (err) {
				console.error('Error reading manifest.json:', err);
				process.exit(1);
			}

			try {
				const manifestJson = JSON.parse(manifestData);

				// Split the current version into major, minor, and patch parts
				const versionParts = packageJson.version.split('.').map(Number);

				switch (versionBumpType) {
					case 'full':
						versionParts[0]++; // Increment major version
						versionParts[1] = 0; // Reset minor version
						versionParts[2] = 0; // Reset patch version
						break;
					case 'change':
						versionParts[1]++; // Increment minor version
						versionParts[2] = 0; // Reset patch version
						break;
					case 'fix':
						versionParts[2]++; // Increment patch version
						break;
				}

				const newVersion = versionParts.join('.');

				// Update the version in package.json
				packageJson.version = newVersion;

				// Update the version in manifest.json
				manifestJson.version = newVersion;

				// Write the updated package.json back to the file
				fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
					if (err) {
						console.error('Error writing package.json:', err);
						process.exit(1);
					}

					// Write the updated manifest.json back to the file
					fs.writeFile(manifestJsonPath, JSON.stringify(manifestJson, null, 2), (err) => {
						if (err) {
							console.error('Error writing manifest.json:', err);
							process.exit(1);
						}
						console.log(`Version bumped to ${newVersion}`);
					});
				});
			} catch (manifestParseError) {
				console.error('Error parsing manifest.json:', manifestParseError);
				process.exit(1);
			}
		});
	} catch (packageParseError) {
		console.error('Error parsing package.json:', packageParseError);
		process.exit(1);
	}
});
