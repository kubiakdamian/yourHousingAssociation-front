import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//Interface
import Button from './../InterfaceUtils/Button';
import { Input } from './../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';

class AddManager extends Component {   
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: ""
        };
    }

    updateEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    updatePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    updateName = e => {
        this.setState({
            name: e.target.value
        })
    }

    updateLastName = e => {
        this.setState({
            lastName: e.target.value
        })
    }

    clearForm = () => {
        this.setState({
            email: "",
            password: "",
            name: "",
            lastName: ""
        })
    }

    addManager = () => {
        axios({ 
            method: 'post',
            url: `http://localhost:8081/registration/manager`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            },
            data: {
                "email": this.state.email,
                "password": this.state.password,
                "firstName": this.state.name,
                "lastName": this.state.lastName
            }
        })
        .then(response => {
            NotificationManager.info('Manager added successfully', '', 3000);
            this.clearForm();
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Something went wrong', 3000); 
        }); 
    }

    render() {
        return (
            <FormContainer className="col-md-4 ml-auto mr-auto">
                    <Header className="col-md-12">Add manager</Header>
                    <div className="col-md-10 ml-auto mr-auto">
                        <Input
                            onChange={this.updateEmail}
                            value={this.state.email}
                            placeholder="E-mail"
                            id="login"
                            type="email"
                            required />

                        <Input
                            onChange={this.updatePassword}
                            value={this.state.password}
                            placeholder="Password"
                            id="password"
                            type="password"
                            required />

                        <Input
                            onChange={this.updateName}
                            value={this.state.name}
                            placeholder="Name"
                            id="name"
                            type="text"
                            required />

                       <Input
                            onChange={this.updateLastName}
                            value={this.state.lastName}
                            placeholder="Last name"
                            id="lastName"
                            type="text"
                            required />

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

export default AddManager;


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