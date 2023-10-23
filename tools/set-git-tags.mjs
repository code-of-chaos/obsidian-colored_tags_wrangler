// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { promises as fsPromises } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import {fileURLToPath} from "url";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
async function readManifestVersion(filepath) {
	try {
		const fileData = await fsPromises.readFile(filepath, 'utf8');
		const manifestJson = JSON.parse(fileData);
		return manifestJson.version;
	} catch (err) {
		console.error(`Error reading ${filepath}:`, err);
		process.exit(1);
	}
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
const dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestJsonPath = path.join(dirname, '../manifest.json');

(async () => {
	const version = await readManifestVersion(manifestJsonPath);

	exec(`git tag -a ${version} -m "Version ${version}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error creating Git tag: ${error}`);
			process.exit(1);
		} else {
			console.log(`Git tag ${version} created successfully.`);
		}
	});
})();
