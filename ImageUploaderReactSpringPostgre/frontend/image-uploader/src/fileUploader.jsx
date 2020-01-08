import React, { Component } from 'react';
import { FileService } from './file-service.jsx';

export class FileUploader extends Component {
    constructor() {
        super();
        this.fileService = new FileService();

       
    }

    state={
        firstName:"Novak",
        lastName:"Djokovic"
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        //using File API to get chosen file
        let file = event.target.files[0];
        console.log("Uploading file", event.target.files[0]);
        data.append('file', event.target.files[0]);
        data.append('firstName',this.state.firstName);
        data.append('lastName',this.state.lastName);
        data.append('name', 'my_file');
        data.append('description', 'this file is uploaded by young padawan');
        let self = this;
        //calling async Promise and handling response or error situation
        this.fileService.uploadFileToServer(data).then((response) => {
            console.log("File " + file.name + " is uploaded");
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
    };

    handleInputFirstName = event =>{
        this.setState({firstName:event.target.value})
    }

    handleInputLastName = event =>{
        this.setState({lastName:event.target.value})
        console.log(this.state.lastName);
    }

    render() {
        return (
            <div>
                
                <h4>FirstName:</h4>
                <input type="text" onChange={this.handleInputFirstName}></input>
                <h4>LastName:</h4>
                <input type="text"onChange={this.handleInputLastName}></input>
                <br></br>
                <input type="file" onChange={this.handleUploadFile} />
            </div>
        )
    };
}
