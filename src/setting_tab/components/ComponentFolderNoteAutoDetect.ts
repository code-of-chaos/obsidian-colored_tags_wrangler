// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
import * as YAML from 'js-yaml'
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
			.setName("Auto detect tags in folder notes")
			.setDesc(`Traverses your vault and stores all tags found in notes with the same name as the folder they are found in`)
			.addButton((button) =>
				button
				.setButtonText('Detect')
				.onClick(async () => {
					await this._auto_detect_links()
					await Promise.all([
						this.plugin.saveSettings(),
						this.settings_tab.display()
					]);
				})
				.setClass('mod-warning')
		);
	}

	// -----------------------------------------------------------------------------------------------------------------
	private async _auto_detect_links(): Promise<void> {
		const { vault } = this.plugin.app;
		const markdownFiles = vault.getMarkdownFiles();

		// Loop through the markdown files
		for (const file of markdownFiles) {
			const parentFolderName = this.getParentFolderName(file.path);
			console.warn(file);
			if (file.name.replace(".md", "") === parentFolderName) {
				let found_tags = this.parseYamlFrontMatter(await vault.read(file));
				console.warn(found_tags);

				if (found_tags && found_tags.length > 0) {
					for (const tag of found_tags) {
						const exists_TagColors = this.processTagColors(tag);
						const exists_SemanticObsidianColors = this.processSemanticObsidianColors(tag);
						const exists_CssVars = this.processCssVars(tag);

						if (exists_TagColors !== null) {
							this.addFolderTagLink(uuid4(), tag, file.path.replace(file.name, ""));
							console.warn("applied exists_TagColors");
						} else if (exists_SemanticObsidianColors !== null) {
							this.addFolderTagLink(uuid4(), tag, file.path.replace(file.name, ""));
							console.warn("applied exists_SemanticObsidianColors");
						} else if (exists_CssVars !== null) {
							this.addFolderTagLink(uuid4(), tag, file.path.replace(file.name, ""));
							console.warn("applied exists_CssVars");
						} else {
							console.warn("applied NOTHING");
						}
					}
				}
			}
		}
	}
	private addFolderTagLink(uuid: string, tag: string, folderName: string) {
		this.plugin.settings.FolderNote.FolderTagLinks[uuid] = { tag_name: tag, folder_path: folderName };
	}

	getParentFolderName(filePath: string): string {
		// Extract the parent folder name from the file path
		const pathParts = filePath.split('/');
		return pathParts[pathParts.length - 2];
	}

	hasYamlFrontMatter(fileContent: string): boolean {
		// Check if the file content contains "---" indicating the start of YAML front matter
		return fileContent.startsWith('---');
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

	private processSemanticObsidianColors(tag_to_find: string) {
		for (const key in this.plugin.settings.TagColors.SemanticObsidianColors) {
			if (this.plugin.settings.TagColors.SemanticObsidianColors[key].tag_name === tag_to_find) {
				return key;
			}
		}
		return null;
	}

	private processCssVars(tag_to_find: string) {
		for (const key in this.plugin.settings.TagColors.CssVars) {
			if (this.plugin.settings.TagColors.CssVars[key].tag_name === tag_to_find) {
				return key;
			}
		}
		return null;
	}
}



