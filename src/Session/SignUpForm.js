import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
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
            captchaTicked: false
        };
    }

    tickCaptcha = () => {
        this.setState({
            captchaTicked: true
        })
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
        if(this.state.captchaTicked === false){
            NotificationManager.error('Use captcha to sign up', '', 3000);
        } else{
            this.props.enableLoading();
            axios.post(`http://localhost:8080/authentication/registration/${this.props.language.language.language}`, {
                "email": this.state.email,
                "password": this.state.password,
                "firstName": this.state.name,
                "lastName": this.state.lastName,
            })
            .then(response => {
                this.props.disableLoading();
                NotificationManager.info('Signed up successfully', '', 3000);
                this.props.history.push("/");
            })
            .catch(error => {
                if(error.response.data.code === "UAE"){
                    NotificationManager.error('', 'User already exists', 3000); 
                    this.setState({
                        email: "",
                        password: ""
                    })
                } else{
                    NotificationManager.error('Please try again', 'Something went wrong', 3000); 
                }
                this.props.disableLoading();
            });
        }
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

                    <ReCAPTCHA
                        sitekey="6Lf2u5oUAAAAAHvzHMhVsDbxCE_ycfuu_wL6gTS6"
                        onChange={this.tickCaptcha}
                        style={{marginTop: "2vh"}}
                    />

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

const mapStateToProps = state => {
    return {
      language: state.lang
    };
  };

export default connect(mapStateToProps)(withRouter(SignUpForm));


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