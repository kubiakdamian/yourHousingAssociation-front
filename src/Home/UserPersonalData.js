import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//Interface
import Button from './../InterfaceUtils/Button';
import { Input } from './../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';
import { FormattedMessage } from "react-intl";

class UserPersonalData extends Component {
    constructor(props){
        super(props);

        this.state = {
            verificationKey: ""
        };
    }

    updateVerificationKey = e => {
        this.setState({
            verificationKey: e.target.value
        })
    }

    verifyUser = () => {
        axios({ 
            method: 'post',
            url: `http://localhost:8081/user/verify/${this.state.verificationKey}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            } 
        })
        .then(response => {
            this.props.getUserData();

            this.props.setUserAsVerified();
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Something went wrong', 3000);  
        });
    }

    render() {
        return (
            <div>
                <Greeting>                        
                    <FormattedMessage 
                        id="hello"
                        defaultMessage="Hello"/> {this.props.firstName} {this.props.lastName}
                </Greeting>
                <ul className="list-group" style={{fontWeight: "bold", textAlign: "center", marginTop: "3vh"}}>
                    <li className="list-group-item borderless">{this.props.city}, {this.props.street} {this.props.streetNumber} m.{this.props.apartmentNumber}</li>
                    <li className="list-group-item">{this.props.postalCode}</li>
                    <li className="list-group-item">Block: {this.props.blockNumber}</li>
                </ul>
                {this.props.isVerified === false ?
                    <div>
                        <Input
                            style={{textAlign: "center"}}
                            onChange={this.updateVerificationKey}
                            value={this.state.verificationKey}
                            placeholder="Verification Key"
                            id="verificationKey"
                            type="text"
                            required />

                    <ButtonContainer className="col-md-12">
                        <Button 
                            label={"Verify"}
                            style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "8vw", minHeight: "4vh"}}
                            onClick={this.verifyUser}/>
                    </ButtonContainer>
                    <Greeting style={{color: "#ef001b"}}>
                        <FormattedMessage 
                            id="verification.info"
                            defaultMessage="Verify your account to get access to fees"/>
                    </Greeting>
                    </div>
                    :
                    <Greeting style={{color: "#03b500"}}>
                        <FormattedMessage 
                            id="verified"
                            defaultMessage="Verified"/>
                    </Greeting>
                }
            </div>
        );
    }
}

export default UserPersonalData;

const Greeting = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    color: white;
    padding-bottom: 2vh;
`

const ButtonContainer = styled.div`
    text-align: center;
    padding-bottom: 1vh;
`