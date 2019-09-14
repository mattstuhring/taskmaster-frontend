import React, {useState} from 'react';
import './App.scss';

let form = new FormData();

function NewTaskForm(props) {
  console.log(props);
  console.log("props id ", props.taskId);

  const API = 'http://taskmaster-dev-1.us-west-2.elasticbeanstalk.com/api/v1/tasks';

  function _handleChange(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }

  function _upload(event) {
    event.preventDefault();

    fetch(`${API}/${props.taskId}/images`, {
      method: "POST",
      mode: 'cors',
      body: form,
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  return (
    <div className="form">
      <form className="form-inline" onSubmit={_upload} method="post" encType="multipart/form-data">
        <div className="form-group mb-2">
          <label htmlFor="staticFile2">Add Image:</label>
          <input type="file" name="file" onChange={_handleChange} className="form-control-file" id="staticFile2" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </form>
    </div>
  );
}

export default NewTaskForm;

