<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { timeDifference } from '../utils';
  export let startDate: number;

  let differenceInSeconds = 0;
  let timerInterval = 0;
  $: difference = timeDifference(differenceInSeconds);

  onMount(() => {
    timerInterval = setInterval(() => {
      if (startDate) {
        console.info({ startDate });

        differenceInSeconds = (Date.now() - startDate) / 1000;
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timerInterval);
  });
</script>

<style>
  .is-warning {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
</style>

<div class="nes-badge is-splited">
  <span class="is-warning">⏳</span>
  <span class="is-primary"> {difference.string} </span>
</div>
