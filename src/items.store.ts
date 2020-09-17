import { writable } from 'svelte/store';
import type {TodoItem} from './types/item';

export interface TaskListOptions {
  name: string;
}

  export const taskListOptions = writable<TaskListOptions>(readJsonFromStorage('options', {}));
  taskListOptions.subscribe(val => writeJsonToStorage('options', val));

  export const items = writable<TodoItem[]>(readJsonFromStorage('items', []));
  items.subscribe(val => writeJsonToStorage('items', val));
    

  function readJsonFromStorage(key: string, defaultValue: any) {
    const valueFromStorage = localStorage.getItem(key);

    if (valueFromStorage) {
      return JSON.parse(valueFromStorage);
    }

    return defaultValue;
  }

  
  function writeJsonToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }