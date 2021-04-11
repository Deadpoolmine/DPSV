import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class test extends Component {
    state = {
 
        // Initially, no file is selected
        selectedFile: null
      };
      
      // On file select (from the pop up)
      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };
      
      // On file upload (click the upload button)
      onFileUpload = () => {
      
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "user_avatar",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        formData.append("hello", "exm")
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        PostRequest(formData, API.API_ADD_USER, (res) => {
          console.log(res);
        });
      };
      
      // File content to be displayed after
      // file upload is complete
      fileData = () => {
      
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
  <p>File Name: {this.state.selectedFile.name}</p>
   
               
  <p>File Type: {this.state.selectedFile.type}</p>
   
               
  <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      
      render() {
      
        return (
          <div>
              <h1>
                GeeksforGeeks
              </h1>
              <img src="http://127.0.0.1:5000/uploads/reply-update.png">
  
              </img>
              <h3>
                File Upload using React!
              </h3>
              <div>
                  <input type="file" onChange={this.onFileChange} />
                  <Button onClick={this.onFileUpload}>
                    上传!
                  </Button>
              </div>
            {this.fileData()}
          </div>
        );
      }
}
