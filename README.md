# Obsidian - Colored Tag Wrangler
This plugin allows the user to apply different colors to different tags.
The tags are applied in the "Settings Tab" of the plugin.

## Features
- The ability to define a tag with a unique color by a Color Picker
  - You can also enable the option to decouple text- and background color and choose two different colors for one tag.
- Integration with Canvas cards.
  - Setting to apply a tag color to a Canvas card which has that tag.
- Integration with the [Kanban](https://github.com/mgmeyers/obsidian-kanban) plugin.
  - Setting to apply a tag color to a Kanban card which has that tag.
  - Setting to apply a tag color to a Kanban list, when a tag is present in the title.
  - Setting to omit the `#` from tags in the Kanban view
- Integration with tags within Folder Notes's properties
  - Setting to apply color to a folder, if the folder's note has a colored tag within its file's properties.
  - *Current flaw*: You have to manually press the `detect` button in the Settings, when you change the tag within in a file's properties.
  - This isn't really tied to a single plugin. I use [AidenLX's FolderNote](https://github.com/aidenlx/alx-folder-note) for this, but any file that has the same name as the folder in which it is in will work

### Feature Examples

| Feature                                                                                                                                                                                                                                                   | Image                                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Settings for tags <br> (note: I've enable multiple tags for one line, seperated by a `;` and I've also enabled the `Enable separate background color` option as well. The first color picker is for the text color, the second one for background color.) | ![tags_setting.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/tags_setting.png)             |
| colored tags                                                                                                                                                                                                                                              | ![tags_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/tags_example.png)             |
| Colored Tags in a note's properties <br> (note: currently works when you refresh the page. This is in the works of being changed in the future)                                                                                                           | ![properties_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/properties_example.png) |
| Canvas Integration                                                                                                                                                                                                                                        | ![canvas_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/canvas_example.png)         |
| Kanban Integration                                                                                                                                                                                                                                        | ![kanban_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/kanban_example.png)         |
| Folder Note Integration                                                                                                                                                                                                                                   | ![foldernote_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/foldernote_example.png) |
| Note Background color, dependant on a tag in the note's properties. <br> (note: currently works when you refresh the page. This is in the works of being changed in the future)                                                                           | ![background_example.png](https://raw.githubusercontent.com/code-of-chaos/obsidian-colored_tags_wrangler/master/assets/background_example.png) |


## Known Issues
The following is a list of known issues. If you know how to fix them, then all help is welcome.
- if a Kanban card, canvas card, or a folder note, has more than one colored tag within it, it isn't always clear why CSS chooses the given color.


## Support
If you like the plugin, and would like to support its development. You can support me on [twitch](https://www.twitch.tv/AnnaSasDev) or donate on [Ko-fi](https://www.twitch.tv/AnnaSasDev).
All donations are welcome, but never feel pressured to give.
