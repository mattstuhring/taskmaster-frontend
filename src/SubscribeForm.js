import React from 'react';
import './App.scss';

//const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api/v1/tasks';
const API = 'https://eic7g8klvd.execute-api.us-west-2.amazonaws.com/dev/tasks';

export default class SubscribeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubscribe(event) {
    event.preventDefault();

    const payload = {
      phoneNumber: this.state.phoneNumber
    }

    fetch(`${API}/subscribe`, {
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
        phoneNumber: ''
      });
      
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="update-assignee">

        <form onSubmit={this.handleSubscribe}>
          <div className="input-group mb-3">
            <input type="text" onChange={this.handleChange} name="phoneNumber" value={this.state.phoneNumber} className="form-control" placeholder="+1234567890" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="submit" id="button-addon2">Submit</button>
            </div>
          </div>
        </form>      
      </div>
    );
  }
}

