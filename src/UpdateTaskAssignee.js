import React from 'react';
import './App.scss';

//const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api/v1/tasks';
const API = 'https://eic7g8klvd.execute-api.us-west-2.amazonaws.com/dev/tasks';

export default class UpdateTaskAssignee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignee: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateTaskAssignee = this.handleUpdateTaskAssignee.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleUpdateTaskAssignee(event) {
    event.preventDefault();

    const payload = {
      id: this.props.taskId,
      assignee: this.state.assignee
    }

    fetch(`${API}/assign`, {
      method: "PUT",
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
      <div className="update-assignee">
        <p><span className="font-weight-bold">Current Assignee:</span> {this.props.assignee}</p>

        <form onSubmit={this.handleUpdateTaskAssignee}>
          <div className="input-group mb-3">
            <input type="text" onChange={this.handleChange} name="assignee" value={this.state.assignee} className="form-control" placeholder="Update assignee" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="submit" id="button-addon2">Submit</button>
            </div>
          </div>
        </form>

        <hr/>
      
      </div>
    );
  }
}

