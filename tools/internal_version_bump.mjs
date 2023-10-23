// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
function process_file(filepath, new_version=null){
	fs.readFile(filepath, 'utf8', (err, fileData) => {
		if (err) {
			console.error(`Error reading ${filepath}:`, err);
			process.exit(1);
		}
		try {
			const jsonData = JSON.parse(fileData);
			if (new_version === null){
				const versionParts = jsonData.version.split('.').map(Number);

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

				new_version = versionParts.join('.');
			}

			jsonData.version = new_version

			fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), (err) => {
				if (err) {
					console.error('Error writing package.json:', err);
					process.exit(1);
				}
			});

		} catch (packageParseError) {
			console.error('Error parsing package.json:', packageParseError);
			process.exit(1);
		}
	})
	return new_version
}

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

let new_version = null;

new_version = process_file(packageJsonPath, new_version);
new_version =process_file(manifestJsonPath, new_version);

console.log(`Version bumped to ${new_version}`);
