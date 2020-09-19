<script lang="ts">
  import type {TodoItem} from './types/item';
  import * as animateScroll from "svelte-scrollto";
  import {onMount} from "svelte";

export let taskListName: string;
export let items: TodoItem[];
export let scrollingInterval = 5000;
export let scrollingDuration = 2000;

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

<div class="nes-container is-dark with-title">
  <p class="title">{taskListName}</p>

  <div class="items-holder" bind:this={itemsListElement}>
  {#each items as item, _index}

      <label class="entry" >


        <input type="checkbox" class="nes-checkbox is-dark" checked={item.done} />
        <span class="label-with-number" style="">
          <div style="display: inline-block">
            <span class="nes-text is-{item.colorName}">
            {item.label}
            </span>
            <span class="nes-text is-warning">
              [#{_index + 1}]
            </span>
          </div>
        </span>
    </label>

    {/each}

        </div>
</div>

<style>
  .nes-container {
    height: calc(100vh - 8px);
    padding-bottom: 0;
  }

  .entry {
    display: flex;
  }

  .items-holder {
    height: 100%;
    overflow-y: hidden;
    margin-left: -1rem;

    /* additional padding so that it can scroll to it.. "perfectly" */
    padding-bottom: 1rem;
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
