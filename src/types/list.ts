import type { TodoItem } from "./item";

export interface TodoList {

  name?: string;
  items?: TodoItem[];
  highlightItemIndex?: number;
  showOnlyItemIndex?: number;
  scrollingInterval?: number;
  scrollingDuration?: number;
  layout?: string;
}
