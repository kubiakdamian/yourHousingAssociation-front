import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//Interface
import Button from '../InterfaceUtils/Button';
import { Input } from '../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';
import './AddArticleStyle.css';

class AddArticle extends Component {
    constructor(props){
        super(props);

        this.state = {
            plTitle: "",
            plText: "",
            enTitle: "",
            enText: "",
            deTitle: "",
            deText: "",
            file: ''
        };
    }

    updatePlTitle = e => {
        this.setState({
            plTitle: e.target.value
        })
    }

    updatePlText = e => {
        this.setState({
            plText: e.target.value
        })
    }

    updateEnTitle= e => {
        this.setState({
            enTitle: e.target.value
        })
    }

    updateEnText = e => {
        this.setState({
            enText: e.target.value
        })
    }

    updateDeTitle = e => {
        this.setState({
            deTitle: e.target.value
        })
    }

    updateDeText = e => {
        this.setState({
            deText: e.target.value
        })
    }

    updateImage = e => {
        this.setState({
            file: e.target.files[0]
        })
    }
    

    clearForm = () => {
        this.setState({
            plTitle: "",
            plText: "",
            enTitle: "",
            enText: "",
            deTitle: "",
            deText: ""
        })
    }

    addManager = () => {
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('plTitle', this.state.plTitle);
        data.append('plText', this.state.plText);
        data.append('enTitle', this.state.enTitle);
        data.append('enText', this.state.enText);
        data.append('deTitle', this.state.deTitle);
        data.append('deText', this.state.deText);

        axios({ 
            method: 'post',
            url: `http://localhost:8080/article`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            },
            data
        })
        .then(response => {
            NotificationManager.info('Article added successfully', '', 3000);
            this.clearForm();
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Something went wrong', 3000); 
        }); 
    }

    render() {
        console.log(this.state.file);
        console.log(this.state.file.fileName);
        return (
            <FormContainer className="col-md-4 ml-auto mr-auto">
                    <Header className="col-md-12">Add article</Header>
                    <div className="col-md-10 ml-auto mr-auto">
                        <label htmlFor="plTitleInput" style={{marginTop: "2vh", color: "white", fontWeight: "bold"}}>PL:</label>
                        <Input
                            onChange={this.updatePlTitle}
                            value={this.state.plTitle}
                            placeholder="PL title"
                            id="plTextArea"
                            type="text"
                            style={{marginTop: "0"}}
                            required />

                        <textarea 
                            className="form-control"
                            id="plTextArea"
                            rows="3"
                            placeholder="PL text"
                            onChange={this.updatePlText}
                            value={this.plText}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "white", fontWeight: "bold"}}>EN:</label>
                        <Input
                            onChange={this.updateEnTitle}
                            value={this.state.updateEnTitle}
                            placeholder="EN title"
                            id="enTitleInput"
                            type="text"
                            style={{marginTop: "0"}}
                            required />

                        <textarea 
                            className="form-control"
                            id="enTextArea"
                            rows="3"
                            placeholder="EN text"
                            onChange={this.updateEnText}
                            value={this.enText}
                            required />
                        
                        <label htmlFor="deTitleInput" style={{marginTop: "2vh", color: "white", fontWeight: "bold"}}>DE:</label>
                        <Input
                            onChange={this.updateDeTitle}
                            value={this.state.deTitle}
                            placeholder="DE title"
                            id="deTitleInput"
                            type="text"
                            style={{marginTop: "0"}}
                            required />

                        <textarea 
                            className="form-control"
                            id="deTextArea"
                            rows="3"
                            placeholder="DE text"
                            onChange={this.updateDeText}
                            value={this.deText}
                            required />

                        <label htmlFor="file-upload" className="custom-file-upload">
                            Upload photo
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={this.updateImage} />
                        <FileName>{this.state.file.name}</FileName>

                        <ButtonContainer className="col-md-12">
                            <Button 
                                label={"Add"}
                                style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                                onClick={this.addManager}/>
                        </ButtonContainer>
                    </div>
            </FormContainer>
        );
    }
}

export default AddArticle;


const Header = styled.div`
    text-align: center;
    font-family: 'Russo One', sans-serif;
    font-size: 45px;
    color: white;
    padding-top: 5vh;

    @media screen and (max-width: 768px) {
        font-size: 38px;
    } 
`

const ButtonContainer = styled.div`
    margin-top: 7vh;
    text-align: center;
    padding-bottom: 3vh;
`

const FormContainer = styled.div`
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    margin-top: 15vh;
    min-height: 70vh;
    border-radius: 15px;
    @media screen and (max-width: 600px) {
        margin-top: 3vh;
        min-height: 85vh;
    } 
`

const FileName = styled.div`
    color: white;
    text-align: center;
`