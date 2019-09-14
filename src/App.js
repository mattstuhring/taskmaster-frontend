import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Accordion, Button, Navbar, Modal } from 'react-bootstrap';

import NewTaskForm from './NewTaskForm.js';
import './App.scss';


const API = 'http://taskmaster-dev-1.us-west-2.elasticbeanstalk.com/api/v1/tasks';


// On Load - Get that data from the API
// Iterate and display major task points
// Some Interaction to expose history

// TODO : Add a link to delete or change status

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }

  useEffect( _getTasks, [] );

  return (
    <div className="app">

      {/* Taskmaster Navbar */}
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home" className="text-light">Taskmaster</Navbar.Brand>
      </Navbar>

      <Container>

        {/* Task header */}
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="text-center">
            <h1>Tasks</h1>
            <hr/>
          </Col>
        </Row>

        {/* List of tasks */}
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Accordion defaultActiveKey="0">

              {/* Itereate through eeach Task abject */}
              {tasks.map((task, idx) => {
                return <Card key={task.id}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
                      {task.title}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={idx}>
                    <Card.Body>

                      {/* New Task Form Component */}
                      {task.image ? null : <span><NewTaskForm taskId={task.id} /> <hr/></span> }
                      
                      {/* History Component */}
                      <History history={task.history} image={task.image} />

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              })}
              
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function History(props) {
  return (
    <div>
      <div className="text-center">
        {props.image ? <img className="uploaded-img" src={props.image} alt="Uploaded"/> : null }
      </div>
      
      <ul>
        {props.history.map( (record,idx) => {
          return (
            <span key={record.date}>
              <li>{record.action}, {record.date}</li>
            </span> 
          )
        })}
      </ul>
    </div>
    
  )
}

export default App;