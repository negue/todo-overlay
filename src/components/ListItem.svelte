<script type="ts">
  import TimeDifference from './TimeDifference.svelte';
  import { timeDifference } from '../utils';
  import { fade, fly } from 'svelte/transition';
  import type { TodoItem } from '../types/item';

  export let item: TodoItem;
</script>

<style>
  .entry {
    display: flex;
    user-select: none;
  }

  .entry-done,
  .entry-fade {
    opacity: 0.55;
  }

  .entry-done .label {
    text-decoration: line-through;
  }

  .label-with-number {
    max-width: 80vw;
    display: inline-flex;
  }

  .nes-checkbox + span::before,
  .nes-checkbox:checked + span::before {
    top: 2px !important;
  }

  .timer-badges {
    width: 100%;
    margin-bottom: 1rem;
  }
</style>

<label
  in:fade={{ duration: 500 }}
  out:fly={{ x: -500, duration: 500 }}
  class="entry {item.done ? 'entry-done' : ''}
    {item.highlighted ? 'entry-highlight' : item.highlighted === false ? 'entry-fade' : ''}">
  <input type="checkbox" class="nes-checkbox is-dark" checked={item.done} />
  <span class="label-with-number">
    <div style="display: inline-block">
      <span class="nes-text label is-{item.colorName}" style={item.colorStyle}>
        {item.label}
      </span>
      <span class="nes-text is-warning"> [#{item.id}] </span>
    </div>

    <br />
  </span>
</label>

{#if item.startTime || item.spentTime}
  <div
    class="timer-badges"
    in:fade={{ duration: 500 }}
    out:fly={{ x: -500, duration: 500 }}>
    {#if item.startTime}
      <TimeDifference startDate={item.startTime} />
    {/if}

    {#if item.spentTime}
      <div class="nes-badge is-splited">
        <span class="is-warning">Spent</span>
        <span class="is-success">{timeDifference(item.spentTime).string}</span>
      </div>
    {/if}
  </div>
{/if}
