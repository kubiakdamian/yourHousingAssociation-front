import React, { Component } from 'react';
import { Input } from '../InterfaceUtils/Input';
import Button from './../InterfaceUtils/Button';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FormattedMessage } from "react-intl";

class Payment extends Component {
    constructor(props){
        super(props);

        this.state = {
            number: "",
            name: "",
            expiry: "",
        };
    }

    updateNumber = e => {
        this.setState({
            number: e.target.value
        })
    }

    updateName = e => {
        this.setState({
            name: e.target.value
        })
    }

    updateExpiry = e => {
        this.setState({
            expiry: e.target.value
        })
    }

    disableNumber = val => {
        var input = document.getElementById("numberInput");
        input.disabled = ( val.length > 15  );
    }

    disableExpiry = val => {
        var input = document.getElementById("expiryInput");
        input.disabled = ( val.length > 3  );
    }

    clearForm = () => {
        var numberInput = document.getElementById("numberInput");
        var expiryInput = document.getElementById("expiryInput");

        numberInput.removeAttribute('disabled');
        expiryInput.removeAttribute('disabled');

        this.setState({
            number: "",
            name: "",
            expiry: ""
        })
    }


    render() {
        const { number, name, expiry} = this.state;
        return (
            <div className="col-md-6 ml-auto mr-auto">
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                />

                <InputHolder className = "col-md-4 ml-auto mr-auto">

                    <Input
                        onChange={this.updateNumber}
                        value={number}
                        placeholder="Number"
                        id="numberInput"
                        type="number"
                        step="1"
                        max="9999999999999999"
                        style={{marginTop: "0"}}
                        onKeyUp={() => this.disableNumber(number)}
                        required />

                    <Input
                        onChange={this.updateName}
                        value={name}
                        placeholder="Name"
                        type="text"
                        style={{marginTop: "0"}}
                        required />

                    <Input
                        onChange={this.updateExpiry}
                        value={expiry}
                        placeholder="Expiry"
                        id="expiryInput"
                        type="number"
                        step="1"
                        max="9999"
                        style={{marginTop: "0"}}
                        onKeyUp={() => this.disableExpiry(expiry)}
                        required />

                </InputHolder>

                <ButtonContainer>
                    <Button 
                        label={<FormattedMessage 
                            id="payment.pay"
                            defaultMessage="Pay"/>}
                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "3vh", marginTop: "0"}}
                        onClick={this.addFee}/>
                </ButtonContainer>

                <ButtonContainer>
                    <Button 
                        label={<FormattedMessage 
                            id="payment.clear.form"
                            defaultMessage="Clear form"/>}
                        style={{backgroundColor: "rgb(196, 19, 19)", minWidth: "10vw", minHeight: "3vh"}}
                        onClick={this.clearForm}/>
                </ButtonContainer>
            </div>
        );
    }
}

export default Payment; 

const InputHolder = styled.div`
    margin-top: 2vh;
`

const ButtonContainer = styled.div`
    margin-top: 1vh;
    text-align: center;
`