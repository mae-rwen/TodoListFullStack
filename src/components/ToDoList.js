import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function ToDoList() {
  return (
    <Card className="listCard">
      <Card.Body>
        <ListGroup className="listOfTodos">

          {/* item to render */}
          <ListGroup.Item action variant="success">
            <Accordion>
              <Accordion.Header>
                Example of an average important task
              </Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>

          {/* Hardcoded examples: */}
          <ListGroup.Item action variant="success">
            <Accordion>
              <Accordion.Header>
                Example of an average important task
              </Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>

          <ListGroup.Item action variant="secondary">
            <Accordion>
              <Accordion.Header>This is an overdue task</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>
          
          <ListGroup.Item action variant="warning">
            <Accordion>
              <Accordion.Header>Example of an important Todo</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>
         
          <ListGroup.Item action variant="primary">
            <Accordion>
              <Accordion.Header>May do it, does not have to</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>
          <ListGroup.Item action variant="danger">
            <Accordion>
              <Accordion.Header>
                This task will soon be overdue
              </Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">✅</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="listOfDone">
          <ListGroup.Item>
            <Accordion>
              <Accordion.Header>A task that is done</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">❌</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>

          <ListGroup.Item>
            <Accordion>
              <Accordion.Header>Another task that is done</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">❌</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>

          <ListGroup.Item>
            <Accordion>
              <Accordion.Header>Yet another task that is done</Accordion.Header>
              <Accordion.Body>
                <div className="addBtn">
                  <ButtonGroup>
                    <Button variant="primary">🖊</Button>
                    <Button variant="primary">❌</Button>
                    <Button variant="primary">🗑</Button>
                  </ButtonGroup>
                </div>
              </Accordion.Body>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
