import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Accordion, Button, Navbar } from 'react-bootstrap';

import NewImageForm from './NewImageForm.js';
import NewTaskForm from './NewTaskForm.js';
import UpdateTaskAssignee from './UpdateTaskAssignee.js';
import SubscribeForm from './SubscribeForm.js';
import './App.scss';


//const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api/v1/tasks';
const API = 'https://eic7g8klvd.execute-api.us-west-2.amazonaws.com/dev/tasks';

function App() {

  const [tasks, setTasks] = useState([]);

  function handleGetTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }

  function handleDeleteTask(event, taskId) {
    event.preventDefault();

    const payload = {
      id: taskId
    };

    fetch(API, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => handleGetTasks())
      .catch(err => console.log(err))
  }

  useEffect( handleGetTasks, [] );

  return (
    <div className="app">

      {/* Taskmaster Navbar */}
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home" className="text-light">Taskmaster</Navbar.Brand>
      </Navbar>

      <Container>
        {/* Subscribe form */}
        <Row className="subscribe-form">
          <Col sm={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <p className="font-weight-bold">Enter phone number to receive sms message when a task gets completed.</p>
                <SubscribeForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Task Title */}
        <Row className="mt-4">
          <Col sm={{ span: 6, offset: 3 }} className="text-center">
            <h1>Add Task</h1>
            <hr/>
          </Col>
        </Row>

        {/* Add Task Form */}
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <NewTaskForm reload={handleGetTasks}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tasks Title */}
        <Row className="mt-5">
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
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
                      {task.title}
                    </Accordion.Toggle>

                    <a href="#"><i className="fas fa-trash-alt" onClick={(e) => handleDeleteTask(e, task.id)} /></a>

                  </Card.Header>
                  <Accordion.Collapse eventKey={idx}>
                    <Card.Body>

                      {/* New Task Form Component */}
                      { task.image ? null : <span><NewImageForm taskId={task.id} reload={handleGetTasks} /> <hr/></span> }

                      <UpdateTaskAssignee assignee={task.assignee} taskId={task.id} reload={handleGetTasks} />
                      
                      {/* History Component */}
                      <History history={task.history} image={task.image} taskId={task.id} reload={handleGetTasks} />

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

  function handleUpdateTask(event, taskId) {
    event.preventDefault();

    const payload = {
      id: taskId
    };

    fetch(API, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => props.reload())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="text-center">
        {props.image ? <img className="uploaded-img" src={props.image} alt="Uploaded"/> : null }
      </div>

      <div>
        <p className="font-weight-bold">Task Status 
          <a href="#">
            <span onClick={(e) => handleUpdateTask(e, props.taskId)} className="float-right badge badge-primary badge-pill">update</span>
          </a>
        </p>
        
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