import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from 'axios'

function TodoForm({setTodoItem, todoItem}) {
  const [deadline, setDeadline] = useState(new Date());
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState('')


  // takes the value of the input and save the state for a todo
  const saveTodo = e => {
    setValue(e.target.value)
  }
  // takes the value and saves 1
  const savePriority = e => {
    setPriority(e.target.value)
  }
  // console.log(value)
  // console.log(priority)
  // console.log(deadline)
  // the function on submit
  const onSubmit = e => {
    e.preventDefault()
    setValue('')
    axios
    .post('http://localhost:3001/todos', {
      deadline: deadline,
      value: value,
      priority: priority
    })
    .then(res => setTodoItem([...todoItem, res.data]))
    .catch(err => console.log(err))
  }

  return (
    <Card className="formCard">
      <Card.Body>
        <Form onSubmit={onSubmit} action='http://localhost:3001/todos' method='POST'>
          <Form.Group className="mb-3" >
            <Form.Label>Add your Todo</Form.Label>
            <Form.Control type="text" placeholder="Name of the task" onChange={saveTodo} value={value} required/>
            <Form.Text className="text-muted">
              This field has to be filled
            </Form.Text>
          </Form.Group>

          <div className="priorityAndDate">
            <Form.Group className="mb-3" style={{ width: "50%" }}>
              <Form.Label>Priority</Form.Label>
              <Form.Select aria-label="Default select example" onChange={savePriority}>
                <option value="average">average</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Select the priority level of your task{" "}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "50%" }}>
              <Form.Label>Deadline</Form.Label>
              <DatePicker className="form-control" selected={deadline} onChange={(date) => setDeadline(date)}/>
              <Form.Text className="text-muted">
                Select the deadline for the task
              </Form.Text>
            </Form.Group>
          </div>
          <div className="addBtn">
            <Button variant="primary" type="submit">
              Add Todo
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TodoForm;
