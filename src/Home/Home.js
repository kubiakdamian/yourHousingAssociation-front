import React, { Component } from 'react';
import styled from 'styled-components';
import homeImg from '../Images/home.jpg';
import Button from '../InterfaceUtils/Button';

class Home extends Component {

    nextPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <ImageContainer className="col-md-12">
                        <Header className="col-md-12">Your Housing Association</Header>
                        <ButtonContainer className="col-md-12 text-center">
                            <div className="btn-group-vertical" style={{marginBottom: "15vh"}}>
                                <Button 
                                    label={"Sign In"}
                                    style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "15vw", minHeight: "6vh", marginBottom: "2vh"}}
                                    onClick={() => this.nextPath('/')}/>
                                <Button 
                                    label={"Sign Up"}
                                    style={{backgroundColor: "rgb(66, 134, 244)", minWidth: "15vw", minHeight: "6vh"}}
                                    onClick={() => this.nextPath('/')}/>
                            </div>
                        </ButtonContainer>
                    </ImageContainer>
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
    min-height:70vh;
    max-height: 70vh;
    position: relative;
`;

const Header = styled.div`
    font-size: 80px;
    text-align: center;
    font-family: 'Lilita One', cursive;
    color: black;

    @media screen and (max-width: 768px) {
        font-size: 55px;
    } 
`

const ButtonContainer = styled.div`
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`