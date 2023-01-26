import "./App.css";
import { Container } from "react-bootstrap";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [todoItem, setTodoItem] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((response) => {
        setTodoItem(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className="kontenerek">
        <TodoForm todoItem={todoItem} setTodoItem={setTodoItem} />
        <ToDoList todoItem={todoItem} setTodoItem={setTodoItem} />
      </Container>
    </>
  );
}

export default App;
