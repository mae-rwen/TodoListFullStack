import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function TodoForm({todoItem, setTodoItem}) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Card className="formCard">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add your Todo</Form.Label>
            <Form.Control type="email" placeholder="Name of the task" />
            <Form.Text className="text-muted">
              This field has to be filled
            </Form.Text>
          </Form.Group>

          <div className="priorityAndDate">
            <Form.Group className="mb-3" style={{ width: "50%" }}>
              <Form.Label>Priority</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">average</option>
                <option value="2">high</option>
                <option value="3">low</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Select the priority level of your task{" "}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "50%" }}>
              <Form.Label>Deadline</Form.Label>
              <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)}/>
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
