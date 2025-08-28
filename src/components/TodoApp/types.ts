// types.ts
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export const TODO_FORM_VALUES = {
  TEXT: "text",
} as const;

export type TODO_FORM_VALUES = typeof TODO_FORM_VALUES[keyof typeof TODO_FORM_VALUES];

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}