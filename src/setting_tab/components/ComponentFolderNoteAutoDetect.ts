// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import * as YAML
	from 'js-yaml'
import {v4 as uuid4}
	from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteAutoDetect extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Detect tags in folder notes")
			.setDesc(`Traverses your vault and stores all tags found in notes with the same name as the folder they are found in. (Currently this isn't done automatically)`)
			.addButton((button) =>
				button
				.setButtonText('Detect')
				.onClick(async () => {
					// Reset the table and then detect
					this.plugin.settings.FolderNote.FolderTagLinks = {}
					
					let found_folder_tags = await this._auto_detect_links();
					found_folder_tags
						.sort((a, b) =>
							a.folder_path.localeCompare(b.folder_path)
						)
						.forEach(
							v =>{
								this.plugin.settings.FolderNote.FolderTagLinks[uuid4()] = v
							}
						)
					;

					await Promise.all([
						this.plugin.saveSettings(),
						this.settings_tab.display()
					]);
				})
				.setClass('mod-warning')
		);
	}

	// -----------------------------------------------------------------------------------------------------------------
	private async _auto_detect_links(): Promise<{ tag_name: string; folder_path: string }[]> {
		const { vault } = this.plugin.app;
		const markdownFiles = vault.getMarkdownFiles();

		let links = [];

		// Loop through the markdown files
		for (const file of markdownFiles) {
			if (file.name.replace(".md", "") !== this.getParentFolderName(file.path)) {
				continue;
			}

			let found_tags = this.parseYamlFrontMatter(await vault.read(file));
			if (!(found_tags && found_tags.length > 0)) {
				continue;
			}

			for (const tag of found_tags) {
				if (this.processTagColors(tag) === null) {
					continue;
				}
				let folder_path = file.path.replace(`/${file.name}`, "")
				links.push({tag_name: tag, folder_path: folder_path})
			}
		}

		return links
	}

	getParentFolderName(filePath: string): string {
		// Extract the parent folder name from the file path
		const pathParts = filePath.split('/');
		return pathParts[pathParts.length - 2];
	}

	parseYamlFrontMatter(fileContent: string): string[] {
		// Parse the YAML front matter into a JavaScript object
		const frontMatterMatch = fileContent.match(/---([\s\S]*?)---/);
		if (frontMatterMatch && frontMatterMatch[1]) {
			try {
				let yaml_data = YAML.load(frontMatterMatch[1]) as object
				if (!yaml_data.hasOwnProperty("tags")){
					return [];
				}
				// @ts-ignore
				return yaml_data?.tags;
			} catch (error) {
				console.error('Error parsing YAML front matter:', error);
			}
		}
		return [];
	}

	private processTagColors(tag_to_find: string) {
		for (const key in this.plugin.settings.TagColors.ColorPicker) {
			if (this.plugin.settings.TagColors.ColorPicker[key].tag_name === tag_to_find) {
				return key;
			}
		}
		return null;
	}
}



