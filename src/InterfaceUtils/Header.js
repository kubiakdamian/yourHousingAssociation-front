import React, { Component } from 'react';
import styled from 'styled-components';

class Header extends Component {
    render() {
        return (
            <HeaderBox className="col-md-12" style={this.props.style}>{this.props.header}</HeaderBox>
        );
    }
}

export default Header;

const HeaderBox = styled.div`
    font-size: 80px;
    text-align: center;
    font-family: 'Lilita One', cursive;
    color: black;

    @media screen and (max-width: 768px) {
        font-size: 55px;
    } 
`