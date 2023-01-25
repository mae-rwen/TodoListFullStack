import "./App.css";
import { Container } from "react-bootstrap";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <Header />
      <Container className="kontenerek">
        <TodoForm />
        <ToDoList />
      </Container>
    </>
  );
}

export default App;
