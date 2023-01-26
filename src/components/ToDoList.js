import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function ToDoList({todoItem, setTodoItem}) {
  
  // for changing the color of task due to importance and deadline (if near deadline always high importance)
  const getVariant = (item) => {
    let variant = ""
    let date = new Date(item.deadline)
    let currentDate = new Date()
    let difference = currentDate - date
    let dateOffset = 1000 * 60 * 60 * 24 * 3
    // console.log(`Current date ${currentDate}`)
    // console.log(`deadline ${date}`)
    // console.log(`difference ${difference}`)
    // console.log(`dateOffset ${dateOffset}`)

    // if status done = should have no color
    if (item.status === "done") {
      return ""
    }
 
    // if status overdue = should change to grey
    if (item.status === "overdue") {
      return "secondary"
    }
 
    // if there is less than 3 days left, mark as red
    if (dateOffset + difference > 0) {
      return "danger"
    } 

    // change color depending on priority
    if (item.priority === "high") {
      variant = "danger"
    } else if (item.priority === "low") {
      variant = "primary"
    } else {
      variant = "success"
    };

    return variant;
  };

  // listener for the Mark as Done Button (changes the status of Todo)
  const markAsDone = (id) => async (e) => {
    await axios.put(`http://localhost:3001/todos/${id}`, { status: 'done' });
    setTodoItem(

      todoItem.map((oldItem) => {
        if (id === oldItem.id) {
          return {
            ...oldItem,
            status: "done"
          }
        } else {
          return oldItem;
        }
      }
      )
    );
  };


  return (
    <Card className="listCard">
      <Card.Body>
        <ListGroup className="listOfTodos">
          {todoItem.map((item) => {

            const formattedDate = new Date(item.deadline).toLocaleDateString();
            const id = item.id

            return (
              <ListGroup.Item action variant={getVariant(item)}>
                <Accordion>
                  <Accordion.Header>{item.value} || deadline: {formattedDate}</Accordion.Header>
                  <Accordion.Body>
                    <div className="addBtn">
                      <ButtonGroup>
                        <Button variant="primary">🖊</Button>
                        <Button variant="primary" onClick={markAsDone(id)}>✅</Button>
                        <Button variant="primary">🗑</Button>
                      </ButtonGroup>
                    </div>
                  </Accordion.Body>
                </Accordion>
              </ListGroup.Item>
            );
          })}

          {/* Hardcoded examples: */}
          <hr />
          <ListGroup.Item action variant="success">
            <Accordion>
              <Accordion.Header>
                Green color
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
              <Accordion.Header>Grey color</Accordion.Header>
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
              <Accordion.Header>Yellow color</Accordion.Header>
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
              <Accordion.Header>Blue color</Accordion.Header>
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
                Red color
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
