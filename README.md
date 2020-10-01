# Todo Overlay for OBS/Twitch
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![image](https://user-images.githubusercontent.com/842273/93716478-6190a600-fb70-11ea-8267-f8e0ca6ab4b2.png)

## Import into OBS

Needed Query:
```url
https://negue.github.io/todo-overlay/?channelName=yourName
```


|Option|Description|
|-|-|
|`&command=todo`|The command that should react from twitch chat - Default `todo`|
|`&scrollingInterval=5000`|Time in ms, when the next scrolling to top/bottom will be triggered, this only happens when the view is smaller then entries inside. |
|`&scrollingDuration=2000`|Time in ms, how long the scroll animation should|


## Chat Commands

The broadcaster and mods can execute these commands

`!COMMAND TEXT` is a shortcut for `!COMMAND add TEXT`

Syntax for all other commands: `!COMMAND SUBCOMMAND [ID / TEXT]`

|SUBCOMMAND|Description|
|-|-|
|`new TITLE`|Resets the todo list and sets the name to TITLE|
|`name TITLE`|Renames the list to TITLE|
|`add TEXT`|Adds a new entry with the TEXT|
|`edit POSITION TEXT`|Changes the text of POSITION to the new TEXT|
|`color POSITION COLOR`|Changes the color [see Texts of NES.css](https://nostalgic-css.github.io/NES.css/) or any `#RRGGBB` / `rgb() / rgba()` values of POSITION|
|`move POSITION NEWPOSITION`|Move entry of POSITION to NEWPOSITION|
|`remove POSITION`|Removes the entry at POSITION|
|`toggle POSITION`|Toggles the entry at POSITION, it can also be a comma separated list of positions|
|`highlight POSITION`|Changes all other than POSITION to a lower opacity|
|`cleanup`|Removes all "done" entries|

## Protips :

1. (Windows only)

   Use your the same Overlay-URL in your custom OBS-Docks. Then you can it on stream and in your OBS.

2. You can use multiple commands on separated browser sources, so if you want to have `!todo` (on stream) and a `!later` to do it after :) 
   > Note: You need to change the URL with `&command=later` accordingly

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitch.tv/gacbl"><img src="https://avatars0.githubusercontent.com/u/2153382?v=4" width="100px;" alt=""/><br /><sub><b>Igor Ilic</b></sub></a><br /><a href="#ideas-gigili" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/negue/todo-overlay/commits?author=gigili" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
