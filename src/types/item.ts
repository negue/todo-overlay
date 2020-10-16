export interface TodoItem {
  id?: number;
  done: boolean;
  label: string;
  colorName: string;
  colorStyle: string;
  fade: boolean;
  startTime?: number;   // getTime() current differance till now will be calculated on the fly
  spentTime?: number; // in seconds
}
