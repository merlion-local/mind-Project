export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export enum TODO_FORM_VALUES {
  TEXT = "text",
}

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}