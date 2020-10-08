<script lang="ts">
  import type {TodoItem} from './types/item';
  import * as animateScroll from "svelte-scrollto";
  import { fade, fly } from 'svelte/transition'
  import {onMount} from "svelte";

export let taskListName: string;
export let items: TodoItem[];
export let highlightItemIndex = -1;
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

<div class="nes-container {layout === 'auto' ? 'auto-layout' : ''} is-dark with-title">
  <p class="title">{taskListName}</p>

  <div 
    class="items-holder {highlightItemIndex !== -1 ? 'currently-highlighting' : '' }"
    bind:this={itemsListElement}>
  
    {#each items as item, _index}

      <label
        in:fade={{ duration: 500 }}
        out:fly={{ x: -500, duration: 500 }}
        class="entry {item.done ? 'entry-done' : ''} {_index === highlightItemIndex ? 'entry-highlight' : ''}" >
          <input type="checkbox" class="nes-checkbox is-dark" checked={item.done} />
          <span class="label-with-number">
            <div style="display: inline-block">
              <span class="nes-text label is-{item.colorName}" style="{item.colorStyle}">
              {item.label}
              </span>
              <span class="nes-text is-warning">
                [#{_index + 1}]
              </span>
            </div>
          </span>
      </label>

    {/each}

    <label class="entry">&nbsp;</label>
  </div>
</div>

<style>
  .nes-container {
    height: calc(100vh - 8px);
    padding-bottom: 0;
  }

  .nes-container.auto-layout {
    height: 100%;
    max-height: 100vh;
  }

  .entry {
    display: flex;
    user-select: none;
  }

  .entry:last-of-type {
    height: 0.5rem;
  }

  .entry-done {
    opacity: 0.55;
  }

  .entry-done .label {
    text-decoration: line-through;
  }

  /*TODO  add scss for easier style code */

  .currently-highlighting .entry.entry-highlight {

  }

  .currently-highlighting .entry:not(.entry-highlight) {
    opacity: 0.55;
  }

  .items-holder {
    height: 100%;
    overflow-y: hidden;
    margin-left: -1rem;
  }

  .label-with-number {
    max-width: 80vw;
    display: inline-flex;
  }

  .nes-container.with-title>.title {
    margin-bottom: 0;
  }
  .nes-checkbox+span::before, .nes-checkbox:checked+span::before {
    top: 2px !important;
  }

</style>
