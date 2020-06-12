import React, { Component } from 'react';
import { Input } from '../InterfaceUtils/Input';
import Button from './../InterfaceUtils/Button';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FormattedMessage } from "react-intl";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { connect } from "react-redux";

class Payment extends Component {
    constructor(props){
        super(props);

        this.state = {
            number: "",
            name: "",
            expiry: ""
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

    generatePDF = () => {
        const FileDownload = require('js-file-download');
        axios({ 
            method: 'get',
            url: `http://localhost:8080/authentication/fee/pdf/${this.props.language.language.language}`,
            responseType: 'blob',
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            FileDownload(response.data, 'fee.pdf');
        })
        .catch(error => {

        }); 
    }

    payFee = () => {
        if(this.state.number.length > 0){
            axios({ 
                method: 'post',
                url: `http://localhost:8080/authentication/fee/pay`,
                headers: {
                    'Authorization': localStorage.getItem('yhaToken')
                },
                data: {
                    cardNumber: this.state.number
                }
            })
            .then(response => {
                NotificationManager.success("Fee paid successfully", '', 4000);
                this.clearForm();
                this.props.checkFeeStatus();
            })
            .catch(error => {
                if(error.response.data.code === 'ICN'){
                    NotificationManager.error("Invalid card number", '', 4000);
                    this.clearForm();
                } else {
                    NotificationManager.error("Please try again later", 'Something went wrong', 4000);
                }
            }); 
        } else {
            NotificationManager.error("Invalid card number", '', 4000);
        }
    }


    render() {
        const { number, name, expiry} = this.state;
        return (
            <Container className="col-md-6 ml-auto mr-auto">
                <Amount className="col-md-12">suma: {this.props.amount}zł</Amount>

                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={""}
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
                        onClick={this.payFee}/>
                </ButtonContainer>

                <ButtonContainer>
                    <Button 
                        label={<FormattedMessage 
                            id="payment.clear.form"
                            defaultMessage="Clear form"/>}
                        style={{backgroundColor: "rgb(196, 19, 19)", minWidth: "10vw", minHeight: "3vh"}}
                        onClick={this.clearForm}/>
                </ButtonContainer>

                <ButtonContainer>
                    <Button 
                        label={<FormattedMessage 
                            id="pdf.generate"
                            defaultMessage="Generate PDF"/>}
                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "3vh", marginTop: "0"}}
                        onClick={this.generatePDF}/>
                </ButtonContainer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
      language: state.lang
    };
  };

export default connect(mapStateToProps)(Payment); 

const InputHolder = styled.div`
    margin-top: 2vh;
`

const ButtonContainer = styled.div`
    margin-top: 1vh;
    text-align: center;
`

const Container = styled.div`
    padding-bottom: 5vh;
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    border: 1px solid black;
    border-radius: 10px;
`

const Amount = styled.div`
    color: white;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-top: 2vh;
    margin-bottom: 2vh;
`