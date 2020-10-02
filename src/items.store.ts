import { writable } from 'svelte/store';
import type {TodoItem} from './types/item';

export interface TaskListOptions {
  name: string;
}

const previousOptionsKey = 'options';
const previousItemsKey = 'items';

export function createStore(command: string) {
  const commandOptionsKey = `${command}_options`;
  const commandItemsKey = `${command}_items`;

  let commandOptionsValue = readJsonFromStorage(commandOptionsKey, null);

  if (commandOptionsValue === null) {
    // if the command store is empty, use the previous one
    commandOptionsValue = readJsonFromStorage(previousOptionsKey, {
      name: `!${command} new Title`
    } as TaskListOptions);


  console.info({commandOptionsValue});

    // reset the old one
    writeJsonToStorage(previousOptionsKey, null);
  }

  let commandItemsValue = readJsonFromStorage(commandItemsKey, null);

  if (commandItemsValue === null) {
    // if the command store is empty, use the previous one
    commandItemsValue = readJsonFromStorage(previousItemsKey, []);

    // reset the old one
    writeJsonToStorage(previousItemsKey, null);
  }

  const taskListOptions = writable<TaskListOptions>(commandOptionsValue);
  taskListOptions.subscribe(val => writeJsonToStorage(commandOptionsKey, val));

  const items = writable<TodoItem[]>(commandItemsValue);
  items.subscribe(val => writeJsonToStorage(commandItemsKey, val));

  return {
    taskListOptions,
    items,
    currentHighlight: writable(-1)
  };
}

function readJsonFromStorage(key: string, defaultValue: any) {
  const valueFromStorage = localStorage.getItem(key);

  if (valueFromStorage && valueFromStorage !== 'null') {
    return JSON.parse(valueFromStorage);
  }

  return defaultValue;
}

function writeJsonToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
