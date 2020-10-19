import type { TodoItem } from "./types/item";
import type { Writable } from "svelte/store";
import type { TodoList } from "./types/list";

// todo tests

export function handleCommand(message: string,
  taskListOptions: Writable<TodoList>,
  items: Writable<TodoItem[]>,
  currentHighlight: Writable<number>,
  currentTimer: Writable<number>) {
  const [subCommand, ...content] = message.split(' ');
  const realContent = content.join(' ');

  switch (subCommand) {
    case "new": {
      // TODO extract item store operations
      items.set([]);
      taskListOptions.update(() => {
        return {
          name: realContent
        };
      });

      break;
    }

    case "rm":
    case "remove": {
      const indexId = stringIdToIndexId(realContent);

      if (indexId < 0) {
        return;
      }

      items.update(curItems => {
        if (indexId < curItems.length) {
          const removedItems = curItems.splice(indexId, 1);

          return curItems;
        }

        return curItems;
      });

      break;
    }
    case "cleanup": {
      const indexId = stringIdToIndexId(realContent);

      if (indexId < 0) {
        return;
      }

      currentHighlight.update(_ => -1);
      items.update(curItems => {
        return curItems.filter(item => !item.done);
      });

      break;
    }
    case "toggle": {
      let todoIndexes = [];
      if (realContent.indexOf(",") !== -1) {
        todoIndexes = realContent.split(",");
      } else {
        todoIndexes = [realContent];
      }

      for (const todoIndex of todoIndexes) {
        const indexId = stringIdToIndexId(todoIndex);

        if (indexId < 0) {
          return;
        }


        currentHighlight.update(value => value == indexId ? -1 : value);

        items.update(curItems => {
          if (indexId < curItems.length) {
            const foundItem = curItems[indexId];
            if (foundItem) {
              foundItem.done = !foundItem.done;
            }
          }

          return curItems;
        });
      }

      break;
    }
    case "hl":
    case "highlight": {
      const indexId = stringIdToIndexId(realContent);

      currentHighlight.update(value => {
        if (value === indexId) {
          return -1;
        } else {
          return indexId;
        }
      })

      break;
    }
    case "e":
    case "edit": {
      const [targetIndex, ...newTextAr] = realContent.split(' ');
      const realText = newTextAr.join(' ');
      const indexId = stringIdToIndexId(targetIndex);

      if (indexId < 0) {
        return;
      }

      console.info({ targetIndex, indexId, realText })

      items.update(curItems => {
        if (indexId < curItems.length) {
          const foundItem = curItems[indexId];

          foundItem.label = realText;
        }

        return curItems;
      });

      break;
    }
    case "color": {
      const [targetIndex, ...newTextAr] = realContent.split(' ');
      const realText = newTextAr.join(' ');
      const indexId = stringIdToIndexId(targetIndex);

      if (indexId < 0) {
        return;
      }

      console.info({ targetIndex, indexId, realText })

      items.update(curItems => {
        if (indexId < curItems.length) {
          const foundItem = curItems[indexId];

          if (realText.startsWith("#") || realText.startsWith("rgb")) {
            foundItem.colorStyle = `color: ${realText}`;
          } else {
            foundItem.colorStyle = "";
            foundItem.colorName = realText;
          }
        }

        return curItems;
      });

      break;
    }

    case "mv":
    case "move": {
      const [currentIndexStr, targetIndexStr] = realContent.split(' ');

      const currentIndex = stringIdToIndexId(currentIndexStr);
      const targetIndex = stringIdToIndexId(targetIndexStr);

      if (currentIndex < 0 || targetIndex < 0) {
        return;
      }

      console.info({ currentIndex, targetIndex })

      items.update(curItems => {
        moveArray(curItems, currentIndex, targetIndex);

        return curItems;
      });

      break;
    }

    case "start": {
      const [targetIndexStr, ...rest] = realContent.split(' ');

      const targetIndex = stringIdToIndexId(targetIndexStr);

      currentTimer.update(_ => targetIndex);

      items.update(curItems => {
        const currentItem = curItems[targetIndex];
        currentItem.startTime = Date.now();

        return curItems;
      });

      break;
    }

    case "stop": {
      const [targetIndexStr, ...rest] = realContent.split(' ');

      const targetIndex = stringIdToIndexId(targetIndexStr);

      currentTimer.update(currentItemIndex => {

        if (currentItemIndex == -1) {
          currentItemIndex = targetIndex;
        }

        items.update(curItems => {
          const currentItem = curItems[currentItemIndex];

          if (!currentItem.spentTime) {
            currentItem.spentTime = 0;
          }

          const currentTime = Date.now();

          // Add the difference but without milliseconds
          currentItem.spentTime += (currentTime - currentItem.startTime) / 1000;

          currentItem.startTime = null;

          return curItems;
        });

        return -1;
      });


      break;
    }

    case "name": {
      taskListOptions.update(curObj => {
        curObj.name = realContent;

        return curObj;
      });

      break;
    }

    case "add": {
      const newItem: TodoItem = {
        label: realContent,
        done: false,
        colorName: '',
        colorStyle: null,
        fade: false
      };

      // option: add newones to the top
      items.update(curItems => [...curItems, newItem]);

      break;
    }

    default: {
      const newItem: TodoItem = {
        label: message,
        done: false,
        colorName: '',
        colorStyle: null,
        fade: false
      };

      // option: add newones to the top
      items.update(curItems => [...curItems, newItem]);

      break;
    }
  }
}

function stringIdToIndexId(stringId: string) {
  const parsedId = +stringId;

  if (typeof parsedId === 'number') {
    const indexId = parsedId - 1;

    if (indexId >= 0) {
      return indexId;
    }
  }

  return null;
}

function moveArray(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
}
