import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//Interface
import Button from './../InterfaceUtils/Button';
import { Input } from './../InterfaceUtils/Input';
//Components
import {NotificationManager} from 'react-notifications';

class UserDataForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            city: "",
            blockNumber: "",
            street: "",
            streetNumber: "",
            apartmentNumber: "",
            postalCode: "",
            apartmentSize: ""
        };
    }

    updateCity = e => {
        this.setState({
            city: e.target.value
        })
    }

    updateBlockNumber = e => {
        this.setState({
            blockNumber: e.target.value
        })
    }

    updateStreet = e => {
        this.setState({
            street: e.target.value
        })
    }

    updateStreetNumber = e => {
        this.setState({
            streetNumber: e.target.value
        })
    }

    updateApartmentNumber = e => {
        this.setState({
            apartmentNumber: e.target.value
        })
    }

    updatePostalCode = e => {
        this.setState({
            postalCode: e.target.value
        })
    }

    updateApartmentSize = e => {
        this.setState({
            apartmentSize: e.target.value
        })
    }

    setUserAddress = () => {
        axios({ 
            method: 'post',
            url: `http://localhost:8081/user/address/${this.state.city}/${this.state.blockNumber}/${this.state.street}/${this.state.streetNumber}/${this.state.apartmentNumber}/${this.state.postalCode}/${this.state.apartmentSize}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            } 
        })
        .then(response => {
            this.props.getUserAddress()
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Something went wrong', 3000);  
        });
    }

    render() {
        return (
            <div>
                <div className="col-md-10 ml-auto mr-auto" style={{paddingTop: "2vh"}}>
                    <Input
                        onChange={this.updateCity}
                        value={this.state.city}
                        placeholder="city"
                        id="city"
                        type="text"
                        required />

                    <Input
                        onChange={this.updateStreet}
                        value={this.state.street}
                        placeholder="Street"
                        id="street"
                        type="text"
                        required />

                    <Input
                        onChange={this.updateStreetNumber}
                        value={this.state.streetNumber}
                        placeholder="Street number"
                        id="streetNumber"
                        type="number"
                        required />

                    <Input
                        onChange={this.updateApartmentNumber}
                        value={this.state.apartmentNumber}
                        placeholder="Apartment number"
                        id="apartmentNumber"
                        type="number"
                        required />
                        
                    <Input
                        onChange={this.updateBlockNumber}
                        value={this.state.blockNumber}
                        placeholder="Block number"
                        id="blockNumber"
                        type="number"
                        required />

                    <Input
                        onChange={this.updatePostalCode}
                        value={this.state.postalCode}
                        placeholder="Postal code"
                        id="postalCode"
                        type="text"
                        required />

                    <Input
                        onChange={this.updateApartmentSize}
                        value={this.state.apartmentSize}
                        placeholder="Apartment size"
                        id="apartmentSize"
                        type="number"
                        step="0.1"
                        required />

                    <ButtonContainer className="col-md-12">
                        <Button 
                            label={"Submit"}
                            style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                            onClick={this.setUserAddress}/>
                    </ButtonContainer>

                </div>
            </div>
        );
    }
}

export default UserDataForm;

const ButtonContainer = styled.div`
    text-align: center;
    padding-bottom: 3vh;
`