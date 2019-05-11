import React, { Component } from 'react';
import styled from 'styled-components';

class SubpageHeader extends Component {
    render() {
        if(this.props.icon === undefined){
            return(
                <NoIconHeaderContainer className="col-md-12">
                    <Header>{this.props.header}</Header>
                </NoIconHeaderContainer>
            );
        }
        return (
            <HeaderContainer className="col-md-12">
                <img src={require(`../Images/${this.props.icon}.png`)} width="150" height="150" className="mx-auto d-block" alt="" style={{marginTop: "5vh"}}/>
                <Header>{this.props.header}</Header>
            </HeaderContainer>
        );
    }
}

export default SubpageHeader;

const HeaderContainer = styled.div`
    background: rgb(11, 80, 87);
    min-height: 20vh;
    @media screen and (max-width: 600px) {
        min-height: 40vh;
    } 
`

const NoIconHeaderContainer = styled.div`
    background: rgb(11, 80, 87);
    min-height: 15vh;
`

const Header = styled.div`
    padding-top: 3vh;
    font-size: 50px;
    text-align: center;
    font-family: 'Lilita One', cursive;
    color: white;

    @media screen and (max-width: 600px) {
    font-size: 30px;
    } 
`