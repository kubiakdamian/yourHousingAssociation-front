import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../InterfaceUtils/Header';
import axios from 'axios';
//Interface
import Button from '../InterfaceUtils/Button';
import { Input } from '../InterfaceUtils/Input';

class Charges extends Component {
    constructor(props){
        super(props);

        this.state = {
            isFeeFulfilled: "",
            gas: "",
            coldWater: "",
            hotWater: "",
            sewage: "",
            heating: "",
            repairFund: ""
        };
    }

    componentDidMount(){
        this.checkIfFeeIsFulfilled();
    }

    checkIfFeeIsFulfilled = () => {
        axios({ 
            method: 'get',
            url: `http://localhost:8081/fee/isAdded`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.setState({
                isFeeFulfilled: response.data
            })
        })
        .catch(error => {

        }); 
    }

    addFee = () => {
        axios({ 
            method: 'post',
            url: `http://localhost:8081/fee/${this.state.gas}/${this.state.coldWater}/${this.state.hotWater}/${this.state.sewage}/${this.state.heating}/${this.state.repairFund}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.checkIfFeeIsFulfilled();
        })
        .catch(error => {

        }); 
    }

    updateGas = e => {
        this.setState({
            gas: e.target.value
        })
    }

    updateColdWater = e => {
        this.setState({
            coldWater: e.target.value
        })
    }

    updateHotWater = e => {
        this.setState({
            hotWater: e.target.value
        })
    }

    updateSewage = e => {
        this.setState({
            sewage: e.target.value
        })
    }

    updateHeating = e => {
        this.setState({
            heating: e.target.value
        })
    }

    updateRepairFund = e => {
        this.setState({
            repairFund: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Header header="Charges"/>
                {this.state.isFeeFulfilled ?
                    <Info className="col-md-4 ml-auto mr-auto">You've already fulfilled a fee.</Info>
                    :
                    <Box className="col-md-6 ml-auto mr-auto">
                        <div className="col-md-6 ml-auto mr-auto" style={{paddingTop: "5vh"}}>
                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Gas:</label>
                        <Input
                            onChange={this.updateGas}
                            value={this.state.gas}
                            placeholder="Gas"
                            id="gasInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Cold water:</label>
                        <Input
                            onChange={this.updateColdWater}
                            value={this.state.coldWater}
                            placeholder="Cold water"
                            id="coldWaterInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Hot water:</label>
                        <Input
                            onChange={this.updateHotWater}
                            value={this.state.hotWater}
                            placeholder="Hot water"
                            id="hotWaterInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Sewage:</label>
                       <Input
                            onChange={this.updateSewage}
                            value={this.state.sewage}
                            placeholder="Sewage"
                            id="sewageInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Heating:</label>
                        <Input
                            onChange={this.updateHeating}
                            value={this.state.heating}
                            placeholder="Heating"
                            id="heatingInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <label htmlFor="enTitleInput" style={{marginTop: "2vh", color: "black", fontWeight: "bold"}}>Repair fund:</label>
                        <Input
                            onChange={this.updateRepairFund}
                            value={this.state.repairFund}
                            placeholder="Repair fund"
                            id="repairFundInput"
                            type="number"
                            step="0.01"
                            style={{marginTop: "0"}}
                            required />

                        <ButtonContainer className="col-md-12">
                            <Button 
                                label={"Add"}
                                style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "10vw", minHeight: "6vh"}}
                                onClick={this.addFee}/>
                        </ButtonContainer>

                    </div>
                    </Box>
                }
            </div>
        );
    }
}

export default Charges;

const Box = styled.div`
    background-color: #e0e0e0;
    margin-top: 5vh;
    min-height: 50vh;
    -webkit-box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
    -moz-box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
    box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
`

const Info = styled.div`
    font-size: 40px;
    color: #3b74ce;
    text-align: center;
`

const ButtonContainer = styled.div`
    margin-top: 7vh;
    text-align: center;
    padding-bottom: 3vh;
`