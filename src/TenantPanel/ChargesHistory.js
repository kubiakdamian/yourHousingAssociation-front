import React, { Component } from 'react';
import SubpageHeader from '../InterfaceUtils/SubpageHeader';
import { FormattedMessage } from "react-intl";
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from "react-redux";

class ChargesHistory extends Component {
    constructor(props){
        super(props);

        this.state = {
            fees: [{}]
        };
    }

    componentWillMount(){
        console.log(this.props.user);
        if(!this.props.user.isVerified){
            this.moveToHomePage();
        }
    }

    componentDidMount(){
        this.getFees();
    }

    moveToHomePage = () => {
        this.props.history.push({
            pathname: `/`,
        });
    }

    getFees = () => {
        axios({ 
            method: 'get',
            url: `http://localhost:8081/fee/history`,
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

    render() {
        return (
            <div>
            <SubpageHeader header={                   
                <FormattedMessage 
                    id="fee.history"
                    defaultMessage="Charges history"/>} />

                <div className="col-md-6 ml-auto mr-auto">
                    {!_.isEmpty(this.state.fees[0]) &&
                        this.state.fees.map(fee =>
                            <FeeBox className="col-md-12"> 
                            <ul className="list-group list-group-flush" style={{fontWeight: "bold", textAlign: "center", marginTop: "3vh", color: "black"}}>
                                <li className="list-group-item" style={{backgroundColor: "#5b7eb7"}}>Passing date: {fee.passingDate}</li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="gas"
                                        defaultMessage="Gas: "/> {fee.gas.toFixed(2)}zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="coldWater"
                                        defaultMessage="Cold water: "/> {fee.coldWater.toFixed(2) }zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="hotWater"
                                        defaultMessage="Hot water: "/> {fee.hotWater.toFixed(2) }zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="sewage"
                                        defaultMessage="Sewage: "/> {fee.sewage.toFixed(2) }zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="tenant.heating"
                                        defaultMessage="Heating: "/> {fee.heating.toFixed(2) }zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="tenant.repairFund"
                                        defaultMessage="Repair fund: "/> {fee.repairFund.toFixed(2) }zł
                                </li>
                                <li className="list-group-item">
                                    <FormattedMessage 
                                        id="sum"
                                        defaultMessage="Sum: "/> {fee.amountToPay.toFixed(2) }zł
                                </li>
                                <li className="list-group-item" style={{backgroundColor: "black"}}></li>
                            </ul>
                            </FeeBox>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user.user
    };
  };

export default connect(mapStateToProps)(ChargesHistory);

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