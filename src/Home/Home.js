import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../InterfaceUtils/Button';
import Announcement from './Announcement';
import Header from './../InterfaceUtils/Header';
import { connect } from "react-redux";
import axios from 'axios';
import _ from 'lodash';
//images - all images come from Pixabay
import homeImg from '../Images/home.jpg';
import electricityImg from '../Images/electricity.jpg';
import waterImg from '../Images/water.jpg';
import gasImg from '../Images/gas.jpg';
import UserDataForm from './UserDataForm';


class Home extends Component {
    constructor(){
        super();

        this.state = {
            userData: {}
        }
    }

    nextPath = (path) => {
        this.props.history.push(path);
    }

    componentDidMount(){
        if(this.props.user.role === "TENANT" && this.props.user.isLogged){
            this.getUserData();
        }
    }

    getUserData = () => {
        axios
        .get(`http://localhost:8081/user/personalData`, {headers: {'Authorization' : localStorage.getItem('yhaToken')}})
        .then(response => {
            this.setState({
                userData: response.data
            })
        })
        .catch(error => {

        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <ImageContainer className="col-md-12">
                        <Header header="Your Housing Association" />
                        {(localStorage.getItem('yhaToken') === undefined || localStorage.getItem('yhaToken') === null) &&
                            <ButtonContainer className="col-md-12 text-center">
                                <div className="btn-group-vertical" style={{marginBottom: "15vh"}}>
                                    <Button 
                                        label={"Sign In"}
                                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "15vw", minHeight: "6vh", marginBottom: "2vh"}}
                                        onClick={() => this.nextPath('/signIn')}/>
                                    <Button 
                                        label={"Sign Up"}
                                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "15vw", minHeight: "6vh"}}
                                        onClick={() => this.nextPath('/signUp')}/>
                                </div>
                            </ButtonContainer>
                        }

                        {(this.props.user.role === "TENANT" && this.props.user.isLogged) &&
                            <PersonalData className="col-md-5 ml-auto mr-auto">
                            {_.isEmpty(this.state.userData) === false ?
                                <div>
                                    <Greeting>Hello {this.state.userData.firstName} {this.state.userData.lastName}</Greeting>
                                    <ul className="list-group" style={{fontWeight: "bold", textAlign: "center", marginTop: "3vh"}}>
                                        <li className="list-group-item borderless">{this.state.userData.city}, {this.state.userData.street} {this.state.userData.streetNumber} m.{this.state.userData.apartmentNumber}</li>
                                        <li className="list-group-item">{this.state.userData.postalCode}</li>
                                        <li className="list-group-item">Block: {this.state.userData.blockNumber}</li>
                                    </ul>
                                </div>
                                :
                                <UserDataForm getUserAddress={this.getUserData} />
                            }
                            
                            </PersonalData>
                        }

                    </ImageContainer>
                    <Announcement img={electricityImg} header="Podwyżki cen prądu" text="Z przykrością informujemy, że od 14.05 b.r. w życie wejdą planowane podwyżki cen prądu."/>
                    <Announcement img={waterImg} header="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at tellus nibh. Sed vitae lorem risus. Praesent bibendum est ac tempus sagittis."/>
                    <Announcement img={gasImg} header="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at tellus nibh. Sed vitae lorem risus. Praesent bibendum est ac tempus sagittis."/>
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

export default connect(mapStateToProps)(Home);

const ImageContainer = styled.div`
    background-color: black;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(${homeImg});
    min-height: 65vh;
    max-height: 65vh;
    position: relative;

    @media screen and (max-width: 768px) {
        min-height: 80vh;
        max-height: 80vh;
    } 
`;

const ButtonContainer = styled.div`
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`

const PersonalData = styled.div`
    margin-top: 3vh;
    min-height: 35vh;
    max-height: 35vh;
    background-color: rgb(39, 41, 45);
    border-radius: 10px;
    opacity: 0.99;
`

const Greeting = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    color: white;
`

