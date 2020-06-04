import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../InterfaceUtils/Button';
import Announcement from './Announcement';
import Header from './../InterfaceUtils/Header';
import { connect } from "react-redux";
import axios from 'axios';
import _ from 'lodash';
import { FormattedMessage } from "react-intl";
//images - all images come from Pixabay
import homeImg from '../Images/home.jpg';
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

    componentWillMount(){
        if(this.props.user.role === "TENANT" && this.props.user.isLogged){
            this.getUserData();
        }

        this.getArticles(this.props.language.language.language);
    }

    componentWillReceiveProps(nextProps){
        this.getArticles(nextProps.language.language.language);
    }

    getUserData = () => {
        axios
        .get(`http://localhost:8080/authentication/user/personalData`, {headers: {'Authorization' : localStorage.getItem('yhaToken')}})
        .then(response => {
            this.setState({
                userData: response.data
            })
        })
        .catch(error => {

        });
    }

    setUserAsVerified = () => {
        this.props.dispatch({
            type: "VERIFICATION",
            data: {
                isLogged: true,
                isVerified: true,
                role: "TENANT"
            }
        });
    }

    getArticles = lang => {
        axios
        .get(`http://localhost:8080/article/newest/${lang}`)
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
                        <Header header="Your Housing Association" style={{color: "white"}}/>
                        {(localStorage.getItem('yhaToken') === undefined || localStorage.getItem('yhaToken') === null) &&
                            <ButtonContainer className="col-md-12 text-center">
                                <div className="btn-group-vertical" style={{marginBottom: "15vh"}}>
                                    <Button 
                                        label={<FormattedMessage 
                                            id="sign.in"
                                            defaultMessage="sign in"/>}
                                        style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "15vw", minHeight: "6vh", marginBottom: "2vh"}}
                                        onClick={() => this.nextPath('/signIn')}/>
                                    <Button 
                                        label={<FormattedMessage 
                                            id="sign.up"
                                            defaultMessage="sign up"/>}
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
                                        isVerified={this.state.userData.verified}
                                        getUserData={this.getUserData} 
                                        setUserAsVerified={this.setUserAsVerified} />
                                </div>
                                :
                                <div>
                                    <UserDataForm getUserAddress={this.getUserData} />
                                    
                                    <VerificationInfo style={{color: "#ef001b"}}>
                                    <FormattedMessage 
                                        id="verification.info"
                                        defaultMessage="Verify your account to get access to fees"/>
                                    </VerificationInfo>
                                </div>
                            }
                            
                            </PersonalData>
                        }

                    </ImageContainer>
                    {!_.isEmpty(this.state.articles[0]) && 
                        this.state.articles.map(article => 
                            <Announcement key={"article" + article.id} imageUrl={article.imageUrl} header={article.title} text={article.text}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user.user,
      language: state.lang
    };
  };

export default connect(mapStateToProps)(Home);

const ImageContainer = styled.div`
    background-color: black;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(${homeImg});
    min-height: 80vh;
    max-height: 80vh;
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
    background-color: rgb(39, 41, 45);
    border-radius: 10px;
    opacity: 0.99;
`

const VerificationInfo = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: white;
    padding-bottom: 2vh;
`



