import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import styled from 'styled-components';

class AppLoader extends Component {
    render() {
        return (
            <LoaderContainer>
                <Loader 
                    type="CradleLoader"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                /> 
            </LoaderContainer>
        );
    }
}

export default AppLoader;

const LoaderContainer = styled.div`
    z-index: 15;
    position: absolute;
    top: 15%;
    left: 47vw;

    @media screen and (max-width: 600px) {
        left: 30vw;
    } 
`
