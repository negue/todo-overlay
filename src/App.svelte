<script lang="ts">
  import TaskList from './components/TaskList.svelte';
  import { createStore } from './items.store';

  import ComfyJS from 'comfy.js';

  import { fillDefaults, queryStringToQueryOptions } from './utils';
  import { handleCommand } from './command.handler';

  // Query Options
  // - ChannelName to listen to
  // - listening command (default: todo)
  const queryOptions = fillDefaults(queryStringToQueryOptions(location.search));

  const {
    items,
    taskListOptions,
    currentHighlight,
    currentTimer
  } = createStore(queryOptions.command);

  ComfyJS.onCommand = (user, command, message, flags, extra) => {
    if ((flags.broadcaster || flags.mod) && command === queryOptions.command) {
      // better state management?!
      handleCommand(
        message,
        taskListOptions,
        items,
        currentHighlight,
        currentTimer
      );

      console.log(
        `!${queryOptions.command} was typed in chat`,
        user,
        message,
        flags,
        extra
      );
    }
  };

  ComfyJS.Init(queryOptions.channelName);
</script>

<style>
  body {
    overflow: hidden;
  }

  * {
    /* https://fonts.google.com/specimen/Press+Start+2P?query=Press+Start+2P */
    font-family: 'Press Start 2P', Arial, sans-serif;
  }
</style>

<main>
  <TaskList
    taskListName={$taskListOptions.name}
    items={$items}
    scrollingDuration={queryOptions.scrollingDuration}
    scrollingInterval={queryOptions.scrollingInterval}
    layout={queryOptions.layout}
    highlightItemIndex={$currentHighlight}
    showOnlyItemIndex={$currentTimer} />
</main>

<!-- NES.css minified -->
<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />

<!-- Press Start 2P - pixelated font <3 -->
<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
  rel="stylesheet" />
