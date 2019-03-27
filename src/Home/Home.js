import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../InterfaceUtils/Button';
import Announcement from './Announcement';
import Header from './../InterfaceUtils/Header';
//images - all images come from Pixabay
import homeImg from '../Images/home.jpg';
import electricityImg from '../Images/electricity.jpg';
import waterImg from '../Images/water.jpg';
import gasImg from '../Images/gas.jpg';


class Home extends Component {

    nextPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <ImageContainer className="col-md-12">
                        <Header header="Your Housing Association" />
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
                    </ImageContainer>
                    <Announcement img={electricityImg} header="Podwyżki cen prądu" text="Z przykrością informujemy, że od 14.05 b.r. w życie wejdą planowane podwyżki cen prądu."/>
                    <Announcement img={waterImg} header="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at tellus nibh. Sed vitae lorem risus. Praesent bibendum est ac tempus sagittis."/>
                    <Announcement img={gasImg} header="Lorem Ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at tellus nibh. Sed vitae lorem risus. Praesent bibendum est ac tempus sagittis."/>
                </div>
            </div>
        );
    }
}

export default Home;

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