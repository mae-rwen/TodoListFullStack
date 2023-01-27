import { Card, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import axios from "axios";

export default function ToDoList({ setTodoItem, todoItem }) {
  // const [todoItem, setTodoItem] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // for changing the color of task due to importance and deadline (if near deadline always high importance)
  const getVariant = (item) => {
    let variant = "";
    let date = new Date(item.deadline);
    let currentDate = new Date();
    let difference = currentDate - date;
    let dateOffset = 1000 * 60 * 60 * 24 * 3;
    // console.log(`Current date ${currentDate}`)
    // console.log(`deadline ${date}`)
    // console.log(`difference ${difference}`)
    // console.log(`dateOffset ${dateOffset}`)

    // if status done = should have no color
    if (item.status === "done") {
      return "";
    }

    // if status overdue = should change to grey
    if (item.status === "overdue") {
      return "secondary";
    }

    // if there is less than 3 days left, mark as red
    if (dateOffset + difference > 0) {
      return "danger";
    }

    if (item.priority === "high") {
      variant = "danger";
    } else if (item.priority === "low") {
      variant = "primary";
    } else {
      variant = "warning";
    }

    return variant;
  };

  // listener for the Mark as Done Button (changes the status of Todo)
  const markAsDone = (id) => async (e) => {
    await axios.put(`http://localhost:3001/todos/${id}`, { status: "done" });
    setTodoItem(
      todoItem.map((oldItem) => {
        if (id === oldItem.id) {
          return {
            ...oldItem,
            status: "done",
          };
        } else {
          return oldItem;
        }
      })
    );
  };

  // listener for the Undo Button (changes the status of Todo)
  const undo = (id) => async (e) => {
    await axios.put(`http://localhost:3001/todos/${id}`, { status: "pending" });
    setTodoItem(
      todoItem.map((oldItem) => {
        if (id === oldItem.id) {
          return {
            ...oldItem,
            status: "pending",
          };
        } else {
          return oldItem;
        }
      })
    );
  };

  // listener for the Delete Todo (removes item from the database)
  const deleteTodo = (id) => async (e) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    setTodoItem(
      todoItem.filter((oldItem) => {
        return oldItem.id !== id;
      })
    );
  };

  // function handleEdit(e) {
  //   e.preventDefault();
  //   setEditText("");
  //   const id = todoItem.id
  //   axios
  //     .put(`http://localhost:3001/todos/${id}`, { value: editText })
  //     .then((res) => setTodoItem([...todoItem, res.data]))
  //     .catch((err) => console.log(err));
  //   setTodoEditing(false);
  // }

  const handleChanges = (id) => async (e) => {
    // setEditText(editText);
    setTodoEditing(null);
    await axios.put(`http://localhost:3001/todos/${id}`, {
      value: editText,
    });
    setTodoItem(
      todoItem.map((changedItem) => {
        // console.log(changedItem)
        if (id === changedItem.id) {
          return {
            ...changedItem,
            value: editText,
            // text: e.target.value,
          };
        } else {
          return changedItem;
        }
      })
    );
  };

  const handleUpdateEditText = async (e) => {
    e.preventDefault();
    setEditText(e.target.value);
  };

  return (
    <Card className="listCard">
      <Card.Body>
        <ListGroup className="listOfTodos">
          {todoItem.filter(item => item.status !== "done").map((item) => {
            const formattedDate = new Date(item.deadline).toLocaleDateString();
            const id = item.id;

            //if (item.status !== "done") {
              return (
                <ListGroup.Item action variant={getVariant(item)} key={item.id} as="div">
                  <Accordion>
                    {todoEditing === id ? (
                      <Form onSubmit={handleChanges(id)}>
                        <Form.Control
                          type="text"
                          onChange={handleUpdateEditText}
                          value={editText}
                          placeholder={item.value}
                        />
                        <Form.Text className="text-muted">
                          Update your task
                        </Form.Text>
                      </Form>
                    ) : (
                      <Accordion.Header>{item.value} || deadline: {formattedDate}</Accordion.Header>
                    )}

                    <Accordion.Body>
                      <div className="addBtn">
                        <ButtonGroup>
                          {todoEditing === id ? (
                            <>
                              <Button
                                type="submit"
                                onClick={handleChanges}
                                // onChange={handleEdit}
                              >
                                Update
                              </Button>
                              <Button
                                onClick={() => setTodoEditing(null)}
                                variant="primary"
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() => {setTodoEditing(id); setEditText(item.value)}}
                                variant="primary"
                              >
                                🖊
                              </Button>
                              <Button variant="primary" onClick={markAsDone(id)}>✅</Button>
                              <Button variant="primary" onClick={deleteTodo(id)}>🗑</Button>
                            </>
                          )}
                        </ButtonGroup>
                      </div>
                    </Accordion.Body>
                  </Accordion>
                </ListGroup.Item>
              );
            //}
          })}
        </ListGroup>
        <ListGroup className="listOfDone">
          {todoItem.filter(item => item.status === "done").map((item) => {
            const id = item.id;

              return (
                <ListGroup.Item action variant={getVariant(item)} key={id} as="div">
                  <Accordion>
                    <Accordion.Header>{item.value}</Accordion.Header>
                    <Accordion.Body>
                      <div className="addBtn">
                        <ButtonGroup>
                          <Button variant="primary" onClick={undo(id)}>✖</Button>
                          <Button variant="primary" onClick={deleteTodo(id)}>🗑</Button>
                        </ButtonGroup>
                      </div>
                    </Accordion.Body>
                  </Accordion>
                </ListGroup.Item>
              );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
