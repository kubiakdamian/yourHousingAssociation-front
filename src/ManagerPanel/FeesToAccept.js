import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

class FeesToAccept extends Component {
    constructor(props){
        super(props);

        this.state = {
            fees: [{}]
        };
    }

    componentDidMount(){
        this.getFees();
    }

    getFees = () => {
        axios({ 
            method: 'get',
            url: `http://localhost:8080/fee/notAccepted`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.setState({
                fees: response.data
            })
        })
        .catch(error => {

        }); 
    }

    acceptFee = id => {
        axios({ 
            method: 'post',
            url: `http://localhost:8080/fee/accept/${id}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.getFees();
        })
        .catch(error => {
            NotificationManager.success('', 'Fee accepted', 3000); 
        }); 
    }

    declineFee = id => {
        axios({ 
            method: 'delete',
            url: `http://localhost:8080/fee/decline/${id}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.getFees();
        })
        .catch(error => {
            NotificationManager.info('', 'Fee declined', 3000); 
        }); 
    }

    render() {
        return (
            <div className="col-md-6 ml-auto mr-auto">
                {!_.isEmpty(this.state.fees[0]) &&
                    this.state.fees.map(fee =>
                        <FeeBox className="col-md-12"> 
                        <ul className="list-group list-group-flush" style={{fontWeight: "bold", textAlign: "center", marginTop: "3vh", color: "black"}}>
                            <li className="list-group-item">Passing date: {fee.passingDate}</li>
                            <li className="list-group-item">Gas: {fee.gas}</li>
                            <li className="list-group-item">Cold water: {fee.coldWater}</li>
                            <li className="list-group-item">Hot water: {fee.hotWater}</li>
                            <li className="list-group-item">Sewage: {fee.sewage}</li>
                            <li className="list-group-item">Heating: {fee.heating}</li>
                            <li className="list-group-item">Repair fund: {fee.repairFund}</li>
                            <li className="list-group-item">
                                <div className="row">
                                    <Icon style={{marginLeft: "43%"}} onClick={() => this.acceptFee(fee.id)}>
                                        <img
                                            src={require("../Images/accept.png")}
                                            alt="accept_icon"
                                        />
                                    </Icon>
                                    <Icon style={{marginLeft: "5%"}} onClick={() => this.declineFee(fee.id)}>
                                        <img
                                            src={require("../Images/delete_icon.png")}
                                            alt="delete_icon"
                                        />
                                    </Icon>
                                </div>
                            </li>
                        </ul>
                        </FeeBox>
                    )
                }
            </div>
        );
    }
}

export default FeesToAccept;

const FeeBox = styled.div`
    min-height: 10vh;
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    margin-top: 3vh;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;

    @media screen and (max-width: 768px) {
        min-height: 15vh;
    } 
`

const Icon = styled.div`
    &:hover{
        cursor: pointer;
    }

    img{
        width: 40px;
    }
`