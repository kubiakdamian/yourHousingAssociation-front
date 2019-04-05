import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../InterfaceUtils/Header';

class Charges extends Component {
    render() {
        return (
            <div>
                <Header header="Charges"/>
                <Box className="col-md-6 ml-auto mr-auto">
                    
                </Box>
            </div>
        );
    }
}

export default Charges;

const Box = styled.div`
    background-color: #e0e0e0;
    margin-top: 5vh;
    min-height: 50vh;
    -webkit-box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
    -moz-box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
    box-shadow: 10px 10px 12px 0px rgba(0,0,0,0.62);
`