import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from "./types";
import { TODO_FORM_VALUES, FilterType } from "./types";
import {
  Page,
  Container,
  Title,
  InputRow,
  Input,
  Button,
  TodoList,
  TodoItem,
  TodoText,
  DeleteButton,
  ErrorText,
  FilterContainer,
  FilterButton,
  ClearButton,
  StatsContainer,
  EmptyState,
  Checkbox
} from "./styles";

interface TodoFormValues {
  [TODO_FORM_VALUES.TEXT]: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const validationSchema = Yup.object().shape({
    [TODO_FORM_VALUES.TEXT]: Yup.string()
      .trim()
      .min(1, "Задача не может быть пустой")
      .max(100, "Задача слишком длинная")
      .required("Введите задачу"),
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

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
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
      <Container>
        <Title>What needs to be done?</Title>

        <form onSubmit={formik.handleSubmit}>
          <InputRow>
            <Input
              type="text"
              name={TODO_FORM_VALUES.TEXT}
              placeholder="Добавить новую задачу..."
              value={formik.values[TODO_FORM_VALUES.TEXT]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              hasError={!!(formik.touched[TODO_FORM_VALUES.TEXT] &&
                formik.errors[TODO_FORM_VALUES.TEXT])}
            />
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Добавить
            </Button>
          </InputRow>

          {formik.touched[TODO_FORM_VALUES.TEXT] &&
            formik.errors[TODO_FORM_VALUES.TEXT] && (
              <ErrorText>{formik.errors[TODO_FORM_VALUES.TEXT]}</ErrorText>
            )}
        </form>

        {/* Фильтры */}
        <FilterContainer>
          <FilterButton 
            active={filter === FilterType.ALL}
            onClick={() => setFilter(FilterType.ALL)}
          >
            Все ({totalTodos})
          </FilterButton>
          <FilterButton 
            active={filter === FilterType.ACTIVE}
            onClick={() => setFilter(FilterType.ACTIVE)}
          >
            Активные ({remainingTodos})
          </FilterButton>
          <FilterButton 
            active={filter === FilterType.COMPLETED}
            onClick={() => setFilter(FilterType.COMPLETED)}
          >
            Завершенные ({completedTodos})
          </FilterButton>
        </FilterContainer>

        {/* Список задач */}
        <TodoList>
          {filteredTodos.length === 0 ? (
            <EmptyState>
              {filter === FilterType.ALL 
                ? "Нет задач. Добавьте первую задачу!" 
                : filter === FilterType.ACTIVE 
                ? "Нет активных задач" 
                : "Нет завершенных задач"}
            </EmptyState>
          ) : (
            filteredTodos.map((todo: Todo) => (
              <TodoItem key={todo.id}>
                <Checkbox completed={todo.completed} />
                <TodoText
                  completed={todo.completed}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </TodoText>
                <DeleteButton onClick={() => deleteTodo(todo.id)}>
                  Удалить
                </DeleteButton>
              </TodoItem>
            ))
          )}
        </TodoList>

        {/* Статистика и очистка */}
        {todos.length > 0 && (
          <StatsContainer>
            <div>
              <strong>{remainingTodos}</strong> {remainingTodos === 1 ? 'item left' : 'items left'}
            </div>
            {completedTodos > 0 && (
              <ClearButton onClick={clearCompleted}>
                Clear completed ({completedTodos})
              </ClearButton>
            )}
          </StatsContainer>
        )}
      </Container>
    </Page>
  );
}