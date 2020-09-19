<script lang="ts">
  import type {TodoItem} from './types/item';

export let taskListName: string;
export let items: TodoItem[];

// TODO Either add scrolling up / down
// TODO or reverse items list

</script>

<div class="nes-container is-dark with-title">
  <p class="title">{taskListName}</p>

  <div class="items-holder">
  {#each items as item, _index}

      <label class="entry" >


        <input type="checkbox" class="nes-checkbox is-dark" checked={item.done} />
        <span class="label-with-number" style="">
          <div style="display: inline-block">
            {item.label}
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
