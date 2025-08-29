import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from "./types";
import { TODO_FORM_VALUES, FilterType } from "./types";
import {
  Page,
  MainTitle,
  Container,
  InputRow,
  ToggleAllButton,
  Input,
  TodoList,
  TodoItem,
  TodoText,
  Checkbox,
  Footer,
  ItemsLeft,
  FilterContainer,
  FilterButton,
  ClearButton
} from "./styles";

interface TodoFormValues {
  [TODO_FORM_VALUES.TEXT]: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    [TODO_FORM_VALUES.TEXT]: Yup.string()
      .trim()
      .min(1, "Task cannot be empty")
      .max(100, "Task is too long")
      .required("Enter a task"),
  });

  const formik = useFormik<TodoFormValues>({
    initialValues: {
      [TODO_FORM_VALUES.TEXT]: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      const newTodo: Todo = {
        id: uuidv4(),
        text: values[TODO_FORM_VALUES.TEXT].trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      resetForm();
    },
  });

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterType.ACTIVE:
        return !todo.completed;
      case FilterType.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo: Todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <Page>
      <MainTitle>todos</MainTitle>
      <Container>
        <InputRow>
          <ToggleAllButton
            data-testid="toggle-all-button"
            isCollapsed={isCollapsed}
            onClick={toggleCollapse}
            type="button"
          />
          <form onSubmit={formik.handleSubmit} style={{ flex: 1, display: 'flex' }}>
            <Input
              data-testid="todo-input"
              type="text"
              name={TODO_FORM_VALUES.TEXT}
              placeholder="What needs to be done?"
              value={formik.values[TODO_FORM_VALUES.TEXT]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </form>
        </InputRow>

        <TodoList 
          data-testid="todo-list"
          isCollapsed={isCollapsed} 
          itemCount={filteredTodos.length}
        >
          {filteredTodos.map((todo: Todo, index: number) => (
            <TodoItem 
              key={todo.id} 
              index={index}
              totalItems={filteredTodos.length}
              data-testid={`todo-item-${index}`}
            >
              <Checkbox
                data-testid={`checkbox-${todo.id}`}
                completed={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              />
              <TodoText 
                data-testid={`todo-text-${todo.id}`}
                completed={todo.completed}
              >
                {todo.text}
              </TodoText>
            </TodoItem>
          ))}
        </TodoList>

        {todos.length > 0 && (
          <Footer 
            data-testid="footer"
            isCollapsed={isCollapsed} 
            hasItems={filteredTodos.length > 0}
          >
            <ItemsLeft data-testid="items-left">
              {remainingTodos} {remainingTodos === 1 ? 'item' : 'items'} left
            </ItemsLeft>
            
            <FilterContainer data-testid="filter-container">
              <FilterButton
                data-testid="filter-all"
                active={filter === FilterType.ALL}
                onClick={() => setFilter(FilterType.ALL)}
              >
                All
              </FilterButton>
              <FilterButton
                data-testid="filter-active"
                active={filter === FilterType.ACTIVE}
                onClick={() => setFilter(FilterType.ACTIVE)}
              >
                Active
              </FilterButton>
              <FilterButton
                data-testid="filter-completed"
                active={filter === FilterType.COMPLETED}
                onClick={() => setFilter(FilterType.COMPLETED)}
              >
                Completed
              </FilterButton>
            </FilterContainer>

            <ClearButton
              data-testid="clear-completed"
              onClick={clearCompleted}
              disabled={completedTodos === 0}
            >
              Clear completed
            </ClearButton>
          </Footer>
        )}
      </Container>
    </Page>
  );
}