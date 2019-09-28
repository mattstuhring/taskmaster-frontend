import React, {useState} from 'react';
import './App.scss';

let form = new FormData();

function NewImageForm(props) {
  const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api/v1/tasks';

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
    .then(() => props.reload())
    .catch(error => console.error('Error:', error))
  }

  return (
    <div className="form-wrapper">
      <p className="font-weight-bold">Add Image</p>
      <form onSubmit={_upload} method="post" encType="multipart/form-data">
  
        <div className="input-group mb-3 image-input">
          <input type="file" name="file" onChange={_handleChange} className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />

          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit" id="button-addon2">Submit</button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default NewImageForm;

