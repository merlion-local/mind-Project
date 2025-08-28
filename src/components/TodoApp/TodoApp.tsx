import { FilterType, type Todo, type TODO_FORM_VALUES } from "./types";
import * as Yup from "yup";

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
        <Title>To-Do List</Title>

        <form onSubmit={formik.handleSubmit}>
          <InputRow>
            <Input
              type="text"
              name={TODO_FORM_VALUES.TEXT}
              placeholder="Введите задачу..."
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
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id}>
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
          ))}
        </TodoList>

        {/* Статистика и очистка */}
        {todos.length > 0 && (
          <StatsContainer>
            <div>
              Осталось задач: <strong>{remainingTodos}</strong>
            </div>
            {completedTodos > 0 && (
              <ClearButton onClick={clearCompleted}>
                Очистить завершенные ({completedTodos})
              </ClearButton>
            )}
          </StatsContainer>
        )}
      </Container>
    </Page>
  );
}

function useState<T>(arg0: never[]): [any, any] {
    throw new Error("Function not implemented.");
}


function useFormik<T>(arg0: { initialValues: { text: string; }; validationSchema: Yup.ObjectSchema<{ text: string; }, Yup.AnyObject, { text: undefined; }, "">; validateOnChange: boolean; validateOnBlur: boolean; onSubmit: (values: any, { resetForm }: { resetForm: any; }) => void; }) {
    throw new Error("Function not implemented.");
}


function uuidv4() {
    throw new Error("Function not implemented.");
}
