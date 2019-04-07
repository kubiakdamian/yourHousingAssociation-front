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
import UserPersonalData from './UserPersonalData';


class Home extends Component {
    constructor(){
        super();

        this.state = {
            userData: {},
            articles: [{}]
        }
    }

    nextPath = (path) => {
        this.props.history.push(path);
    }

    componentDidMount(){
        if(this.props.user.role === "TENANT" && this.props.user.isLogged){
            this.getUserData();
        }
        this.getArticles();
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

    getArticles = () => {
        axios
        .get(`http://localhost:8081/article/newest`)
        .then(response => {
            this.setState({
                articles: response.data
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
                                    <UserPersonalData
                                        firstName={this.state.userData.firstName}
                                        lastName={this.state.userData.lastName} 
                                        city={this.state.userData.city}
                                        street={this.state.userData.street}
                                        streetNumber={this.state.userData.streetNumber}
                                        apartmentNumber={this.state.userData.apartmentNumber}
                                        postalCode={this.state.userData.postalCode}
                                        blockNumber={this.state.userData.blockNumber}
                                        isVerified={this.state.userData.verified}/>
                                </div>
                                :
                                <UserDataForm getUserAddress={this.getUserData} />
                            }
                            
                            </PersonalData>
                        }

                    </ImageContainer>
                    {this.state.articles.map(article => 
                        <Announcement imageUrl={article.imageUrl} header={article.plTitle} text={article.plText}/>
                    )}
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
        min-height: 100vh;
        max-height: 100vh;
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
    /* max-height: 35vh; */
    background-color: rgb(39, 41, 45);
    border-radius: 10px;
    opacity: 0.99;
`



