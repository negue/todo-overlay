<script lang="ts">
  import type {TodoItem} from './types/item';

export let taskListName: string;
export let items: TodoItem[];

</script>

<div class="nes-container is-dark with-title">
  <p class="title">{taskListName}</p>
  
  <div style="background-color:#212529; padding: 1rem 0;">
  {#each items as item, _index}
  
    <label>
       #{_index + 1} 
        <input type="checkbox" class="nes-checkbox is-dark" checked={item.done} />
        <span>{item.label}</span>
    </label>

    <br>
    {/each}

        </div>
</div>

<style>
  .nes-container {
    height: 80vh;
  }
</style>