import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';
import styled from 'styled-components';
import axios from 'axios';
//Interface
import Button from '../InterfaceUtils/Button';
import { Input } from '../InterfaceUtils/Input';
import _ from 'lodash';

class UnverifiedTenants extends Component {
    constructor(props){
        super(props);

        this.state = {
            tenantEmail: "",
            tenant: {}
        };
    }

    updateTenantEmail = e => {
        this.setState({
            tenantEmail: e.target.value
        })
    }

    getTenant = () => {
        axios
        .get(`http://localhost:8081/user/tenant/${this.state.tenantEmail}`, {headers: {'Authorization' : localStorage.getItem('yhaToken')}})
        .then(response => {
            this.setState({
                tenant: response.data
            })
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Tenant not found', 3000); 
            this.setState({
                tenant: {}
            })
        });
    }

    render() {
        return (
            <div className="col-md-6 ml-auto mr-auto"> 
                <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>TENANT EMAIL:</label>
                <Input
                    onChange={this.updateTenantEmail}
                    value={this.state.tenantEmail}
                    placeholder="Tenant email"
                    id="tenantEmailInput"
                    type="text"
                    style={{marginTop: "0"}}
                    required />

                <ButtonContainer className="col-md-12">
                    <Button 
                        label={"Search"}
                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                        onClick={this.getTenant}/>
                </ButtonContainer>

                {!_.isEmpty(this.state.tenant) && 
                    <TenantBox><span>{this.state.tenant.firstName} {this.state.tenant.lastName} {this.state.tenant.key}</span></TenantBox>
                }
            </div>
        );
    }
}

export default UnverifiedTenants;

const ButtonContainer = styled.div`
    margin-top: 3vh;
    text-align: center;
    padding-bottom: 3vh;
`

const TenantBox = styled.div`
    min-height: 7vh;
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    text-align: center;
    font-weight: bold;
    border-radius: 10px;
    line-height: 7vh;
    color: white;
    font-size: 25px;

    span {
        display: inline-block;
        vertical-align: middle;
    }
`