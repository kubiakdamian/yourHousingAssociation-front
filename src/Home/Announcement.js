import React, { Component } from 'react';
import styled from 'styled-components';

class Announcement extends Component {
    render() {
        return (
            <Box className="col-md-8 ml-auto mr-auto">
                    <Header>{this.props.header}</Header>
                    {/* <img
                        src={`http://127.0.0.1:8887/${this.props.imageUrl}`}
                        alt = ""
                    /> */}
                    <Text>{this.props.text}</Text>
            </Box>
        );
    }
}

export default Announcement;

const Box = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    margin-top: 3vh;
    background:linear-gradient(rgba(250,0,0,0.5),transparent);
    border-radius: 15px;
    background-color:orange

    // img{
    //     width: 100%;
    //     height: 100%;
    //     z-index: -1;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    // }
`

const Header = styled.div`
    font-size: 50px;
    text-align: center;
    font-family: 'Arimo', sans-serif;
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

    @media screen and (max-width: 768px) {
        font-size: 30px;
    } 
`

const Text = styled.div`
    font-size: 30px;
    font-family: 'Arimo', sans-serif;
    color: white;
    position: absolute;
    bottom: 45%;
    left: auto;
    right: auto;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

    @media screen and (max-width: 768px) {
        font-size: 20px;
        bottom: 30px;
    } 
`