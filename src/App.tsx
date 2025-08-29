import { Global } from '@emotion/react'; // Добавьте этот импорт
import TodoApp from "./components/TodoApp/TodoApp";
import { globalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <TodoApp />
    </>
  );
}

export default App;