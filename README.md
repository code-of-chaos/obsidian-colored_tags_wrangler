# Obsidian - Colored Tag Wrangler
<span>
	<img alt="GitHub Downloads (specific asset, all releases)" src="https://img.shields.io/github/downloads/code-of-chaos/obsidian-colored_tags_wrangler/main.js">
	<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/code-of-chaos/obsidian-colored_tags_wrangler">
</span>

Always wanted to assign specific colors to your tags? Then this is the plugin for you!

Go into the SettingsManager tab, and start coloring to your heart's content!

### Features

| Feature                                                                                                                                                                                                                                                   | Image                                                                                                                                                |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| SettingsManager for tags <br> (note: I've enable multiple tags for one line, seperated by a `;` and I've also enabled the `Enable separate background color` option as well. The first color picker is for the text color, the second one for background color.) | ![example-tags_settings.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-tags_settings.png) |
| colored tags                                                                                                                                                                                                                                              | ![tags_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-tags.png)                   |
| Colored Tags in a note's properties                                                                                                                                                                                                                       | ![properties_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-properties.png)       |
| Canvas Integration                                                                                                                                                                                                                                        | ![canvas_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-canvas.png)               |
| Kanban Integration                                                                                                                                                                                                                                        | ![kanban_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-kanban.png)               |
| Folder Note Integration                                                                                                                                                                                                                                   | ![foldernote_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-folder_note.png)      |
| Note Background color, dependant on a tag in the note's properties. <br> (note: currently works when you refresh the page. This is in the works of being changed in the future)                                                                           | ![background_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/example-note_background.png)  |

- The ability to define a tag with a Foreground and Background color by Color Pickers
	- `Enable button for Auto Background coloring` : Enables a button next to the color pickers to automatically assign a background color based on the foreground color.
    - `Enable multiple tags per line` : Want to have multiple tags have the same color? Simply enable this button and write each tag on a different line or separate them by `;`
- Obsidian Core Plugins:
	- Canvas Cards : Apply a tag color to a Canvas Card
- Community Plugins:
  - The [Kanban](https://github.com/mgmeyers/obsidian-kanban) plugin.
	- Apply a tag's colors to a Kanban card which has that tag in its body.
	- Apply a tag's colors to a Kanban list, when a tag is present in the title.
	- Allows users to omit the `#` from tags in the Kanban view
  - Integration with tags within Folder Notes's properties
    - Setting to apply color to a folder, if the folder's note has a colored tag within its file's properties.
    - This isn't really tied to a single plugin. I use [AidenLX's FolderNote](https://github.com/aidenlx/alx-folder-note) for this, but any file that has the same name as the folder in which it is in will work

## Example Vault
If you want to mess around with the tags, an example vault has been created for you:
[Colored Tags Wrangler Example Vault](https://github.com/code-of-chaos/obsidian-colored_tags_wrangler-example_vault)

## Known Issues
The following is a list of known issues. If you know how to fix them, then all help is welcome.
- if a Kanban card, canvas card, or a folder note, has more than one colored tag within it, it isn't always clear why CSS chooses the given color.


## Support
If you like the plugin, and would like to support its development. You can support me on [twitch](https://www.twitch.tv/andreassasdev) or donate on [Ko-fi](https://www.twitch.tv/andreassasdev).
All donations are welcome, but never feel pressured to give.
