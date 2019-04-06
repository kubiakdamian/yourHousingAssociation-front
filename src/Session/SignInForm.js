import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
//Interface
import Button from './../InterfaceUtils/Button';
import { Input } from './../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';



class SignInForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    updateLogin = e => {
        this.setState({
            login: e.target.value
        })
    }

    updatePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    signInUser = () => {
        this.props.enableLoading();
        axios.post('http://localhost:8081/user/login', {
            "login": this.state.login,
            "password": this.state.password
        })
        .then(response => {
            this.props.disableLoading();
            NotificationManager.info('Logged in successfully', '', 3000);
            localStorage.setItem('yhaToken', 'Bearer ' + response.data.token);

            this.props.dispatch({
                type: "LOGIN",
                data: {
                    isLogged: true,
                    role: response.data.role
                }
              });

            this.props.history.push("/");
        })
        .catch(error => {
            this.props.disableLoading();
            if(error.response.data.code === 'UNA'){
                NotificationManager.error('', 'User not activated', 3000);
            } else if(error.response.data.code === 'UNF'){
                NotificationManager.error('', 'User not found', 3000);
            } else{
                NotificationManager.error('Please try again', 'Something went wrong', 3000);
            }
        });
    }

    render() {
        return (
            <div>
                <Header className="col-md-12">Sign In</Header>
                <div className="col-md-10 ml-auto mr-auto">
                    <Input
                        onChange={this.updateLogin}
                        value={this.state.login}
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

                    <ButtonContainer className="col-md-12">
                        <Button 
                            label={"Sign In"}
                            style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                            onClick={this.signInUser}/>
                    </ButtonContainer>

                </div>
            </div>
        );
    }
}

export default connect()(withRouter(SignInForm));

const Header = styled.div`
    text-align: center;
    font-family: 'Russo One', sans-serif;
    font-size: 45px;
    color: white;
    padding-top: 15vh;
    @media screen and (max-width: 600px) {
        font-size: 38px;
    } 
`

const ButtonContainer = styled.div`
    margin-top: 7vh;
    text-align: center;
    padding-bottom: 3vh;
`