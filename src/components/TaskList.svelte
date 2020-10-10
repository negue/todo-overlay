<script lang="ts">
  import type { TodoItem } from '../types/item';
  import * as animateScroll from 'svelte-scrollto';
  import { onMount } from 'svelte';
  import ListItem from './ListItem.svelte';

  export let taskListName: string;
  export let items: TodoItem[];
  export let highlightItemIndex = -1;
  export let showOnlyItemIndex = -1;
  export let scrollingInterval = 5000;
  export let scrollingDuration = 2000;
  export let layout = 'full';

  // TODO Either add scrolling up / down
  // TODO or reverse items list

  let itemsListElement;

  onMount(() => {
    var scrollToTop = false;

    setInterval(() => {
      if (scrollToTop) {
        animateScroll.scrollToTop({
          container: itemsListElement,
          duration: scrollingDuration
        });
      } else {
        animateScroll.scrollToBottom({
          container: itemsListElement,
          duration: scrollingDuration
        });
      }

      scrollToTop = !scrollToTop;
    }, scrollingInterval);
  });
</script>

<style>
  .nes-container {
    height: calc(100vh - 8px);
  }

  .nes-container.auto-layout {
    height: 100%;
    max-height: 100vh;
  }

  .items-holder {
    height: 100%;
    overflow-y: hidden;
    padding-top: 0.5rem;
    margin-left: -1rem;
  }

  .nes-container.with-title > .title {
    margin-bottom: 0;
  }
</style>

<div
  class="nes-container {layout === 'auto' ? 'auto-layout' : ''} is-dark with-title">
  <p class="title">{taskListName}</p>

  <div
    class="items-holder {highlightItemIndex !== -1 ? 'currently-highlighting' : ''}"
    bind:this={itemsListElement}>
    {#each items as item, _index}
      {#if showOnlyItemIndex === -1 || showOnlyItemIndex === _index}
        <ListItem
          item={{ ...item, id: _index + 1, highlighted: highlightItemIndex === -1 ? null : _index == highlightItemIndex }} />
      {/if}
    {/each}
  </div>
</div>
