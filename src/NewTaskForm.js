import React from 'react';
import './App.scss';

//const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api/v1/tasks';
const API = 'https://eic7g8klvd.execute-api.us-west-2.amazonaws.com/dev/tasks';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      assignee: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.upload = this.upload.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  upload(event) {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      description: this.state.description,
      assignee: this.state.assignee
    }

    fetch(API, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(response => {
      console.log('Success:', response);

      this.setState({
        title: '',
        description: '',
        assignee: ''
      });
      
    })
    .then(() => {
      this.props.reload();
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.upload}>
          <div className="form-group">
            <input type="text" name="title" value={this.state.title} className="form-control" onChange={this.handleChange} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" name="description" value={this.state.description} className="form-control" onChange={this.handleChange} placeholder="Description" />
          </div>
          <div className="form-group">
            <input type="text" name="assignee" value={this.state.assignee} className="form-control" onChange={this.handleChange} placeholder="Assignee" aria-describedby="assigneeHelp"/>
            <small id="assigneeHelp" className="form-text text-muted">* Optional</small>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
    );
  }
}

