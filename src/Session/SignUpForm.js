import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
//Interface
import Button from './../InterfaceUtils/Button';
import { Input } from './../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';



class SignUpForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: "",
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

    registerUser = () => {
        axios.post('http://localhost:8081/registration', {
            "email": this.state.email,
            "password": this.state.password,
            "firstName": this.state.name,
            "lastName": this.state.lastName,
        })
        .then(response => {
            NotificationManager.info('Signed up successfully', '', 3000);
            this.props.history.push("/");
        })
        .catch(function (error) {
            NotificationManager.error('Please try again', 'Something went wrong', 3000);
        });
    }

    render() {
        return (
            <div>
                    <Header className="col-md-12">Join us</Header>
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
                                label={"Sign Up"}
                                style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                                onClick={this.registerUser}/>
                        </ButtonContainer>

                    </div>
            </div>
        );
    }
}

export default withRouter(SignUpForm);


const Header = styled.div`
    text-align: center;
    font-family: 'Russo One', sans-serif;
    font-size: 45px;
    color: white;
    padding-top: 5vh;
    @media screen and (max-width: 600px) {
        font-size: 38px;
    } 
`

const ButtonContainer = styled.div`
    margin-top: 7vh;
    text-align: center;
    padding-bottom: 3vh;
`