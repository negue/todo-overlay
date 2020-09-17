<script lang="ts">
	import TaskList from './TaskList.svelte';
  import {items, taskListOptions} from './items.store';

  import ComfyJS from "comfy.js";
import type { TodoItem } from './types/item';




ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( flags.broadcaster && command === "todo" ) {
    const [subCommand, ...content] = message.split(' ');
    const realContent = content.join(' ');

    switch (subCommand) {
      case "add": {
        const newItem: TodoItem = {
      label: realContent,
      done: false
        };

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
ComfyJS.Init( "thatn00b__" );

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

<TaskList items={currentItems} taskListName={taskListOptionsObj.name}></TaskList>



<br> <br>


<button type="button" class="nes-btn is-primary"
        on:click={onDownloadState}>Download State</button>

</main>



<!-- minify -->
<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

<style> 
  
   * {
	   font-family: 'Press Start 2P', cursive;
   }

	main {
		padding: 1em;

	}

</style>