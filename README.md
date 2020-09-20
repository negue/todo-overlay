# Todo Overlay for OBS/Twitch

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

Syntax: `!COMMAND SUBCOMMAND [ID / TEXT]`

|SUBCOMMAND|Description|
|-|-|
|`new TITLE`|Resets the todo list and sets the name to TITLE|
|`name TITLE`|Renames the list to TITLE|
|`add TEXT`|Adds a new entry with the TEXT|
|`edit POSITION TEXT`|Changes the text of POSITION to the new TEXT|
|`color POSITION COLOR`|Changes the color [see Texts of NES.css](https://nostalgic-css.github.io/NES.css/) of POSITION|
|`move POSITION NEWPOSITION`|Move entry of POSITION to NEWPOSITION|
|`remove POSITION`|Removes the entry at POSITION|
|`toggle POSITION`|Toggles the entry at POSITION|
|`highlight POSITION`|Changes all other than POSITION to a lower opacity|
|`cleanup`|Removes all "done" entries|


