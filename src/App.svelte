<script lang="ts">
import TaskList from './TaskList.svelte';
import {items, taskListOptions} from './items.store';

import ComfyJS from "comfy.js";
// import type needs to stay, otherwise svelte says no
import type { TodoItem } from './types/item';
import {fillDefaults, queryStringToObject} from "./utils";

// Query Options
// - ChannelName to listen to
// - listening command (default: todo)
const queryOptions = fillDefaults(queryStringToObject(location.search));


ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( (flags.broadcaster || flags.mod) && command === queryOptions.command) {
    const [subCommand, ...content] = message.split(' ');
    const realContent = content.join(' ');

    switch (subCommand) {
      case "new": {
        items.set([]);
        taskListOptions.update(() => {
          return {
            name: realContent
          };
        });

        break;
      }

      case "add": {
        const newItem: TodoItem = {
      label: realContent,
      done: false
        };

        // option: add newones to the top
          items.update(curItems => [...curItems, newItem]);

        break;
      }
      case "remove": {
        const indexId = stringIdToIndexId(realContent);

        if (indexId < 0) {
          return;
        }

          items.update(curItems => {

          if (indexId < curItems.length) {
            const removedItems = curItems.splice(indexId, 1);

            return curItems;
          }

          return curItems;
          });

        break;
      }
        case "cleanup": {
            const indexId = stringIdToIndexId(realContent);

            if (indexId < 0) {
                return;
            }

            items.update(curItems => {
                return curItems.filter(item => !item.done);
            });

            break;
        }
      case "toggle": {
        const indexId = stringIdToIndexId(realContent);

        if (indexId < 0) {
          return;
        }

        items.update(curItems => {
        if (indexId < curItems.length) {
          const foundItem = curItems[indexId];

          foundItem.done = !foundItem.done;
        }

        return curItems;
        });


        break;
      }
       case "edit": {

            const [targetIndex, ...newTextAr] = realContent.split(' ');
    const realText = newTextAr.join(' ');
        const indexId = stringIdToIndexId(targetIndex);

        if (indexId < 0) {
          return;
        }

        console.info({targetIndex, indexId, realText})

        items.update(curItems => {
        if (indexId < curItems.length) {
          const foundItem = curItems[indexId];

          foundItem.label = realText;
        }

        return curItems;
        });


        break;
      }
        case "color": {

            const [targetIndex, ...newTextAr] = realContent.split(' ');
            const realText = newTextAr.join(' ');
            const indexId = stringIdToIndexId(targetIndex);

            if (indexId < 0) {
                return;
            }

            console.info({targetIndex, indexId, realText})

            items.update(curItems => {
                if (indexId < curItems.length) {
                    const foundItem = curItems[indexId];

                    foundItem.colorName = realText;
                }

                return curItems;
            });


            break;
        }

      case "move": {

            const [currentIndexStr, targetIndexStr] = realContent.split(' ');

        const currentIndex = stringIdToIndexId(currentIndexStr);
        const targetIndex = stringIdToIndexId(targetIndexStr);

        if (currentIndex < 0 || targetIndex < 0) {
          return;
        }

        console.info({currentIndex, targetIndex})

        items.update(curItems => {
          moveArray(curItems, currentIndex, targetIndex);

        return curItems;
        });


        break;
      }

      case "name": {
       // todo list name
       taskListOptions.update(curObj => {
         curObj.name = realContent;

         return curObj;
       });

        break;
      }
    }


    console.log( "!todo was typed in chat", user, message, flags, extra, subCommand, realContent );
  }
}
ComfyJS.Init( queryOptions.channelName );

let currentItems;

	const unsubscribe = items.subscribe(value => {
		currentItems = value;
	});

  let taskListOptionsObj;

  const unsubOptions = taskListOptions.subscribe(value => {
    taskListOptionsObj = value;
  });

  function stringIdToIndexId (stringId: string) {
        const parsedId = +stringId;

        if (typeof parsedId === 'number') {
          const indexId = parsedId - 1;

          if (indexId >= 0) {
            return indexId;
          }
        }

    return null;
  }

  function moveArray(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
};

function onDownloadState() {
  // todo
  // create a downloadable file URL?
}

	export let name: string;
</script>

<main>

<TaskList items={currentItems} taskListName={taskListOptionsObj.name}
          scrollingDuration={queryOptions.scrollingDuration}
          scrollingInterval={queryOptions.scrollingInterval}

          />


<!--<button type="button" class="nes-btn is-primary"-->
<!--        on:click={onDownloadState}>Download State</button>-->

</main>



<!-- minify -->
<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

<style>
    body {
        overflow: hidden;
    }

   * {
       /* https://fonts.google.com/specimen/Press+Start+2P?query=Press+Start+2P */
	   font-family: 'Press Start 2P', cursive;
   }

	main {

	}

</style>
