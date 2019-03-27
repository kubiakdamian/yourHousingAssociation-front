import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import SignInForm from './SignInForm';
import { connect } from 'react-redux';
import {NotificationManager} from 'react-notifications';

class SignIn extends Component {

    componentDidMount(){
        if(this.props.user.user.isLogged === true) {
            this.moveToHomePage();
        }
    }

    moveToHomePage = () => {
        NotificationManager.error("Sign out first", '', 4000);

        this.props.history.push({
            pathname: `/`,
        });
    }

    render() {
        return (
            <div>
                <MediaQuery maxDeviceWidth={800}>
                    <FormContainer className="col-md-8 ml-auto mr-auto">
                        <SignInForm />
                    </FormContainer>
                </MediaQuery>

                <MediaQuery minDeviceWidth={801} maxDeviceWidth={1000}>
                    <FormContainer className="col-md-6 ml-auto mr-auto">
                        <SignInForm />
                    </FormContainer>
                </MediaQuery>

                <MediaQuery minDeviceWidth={1001} maxDeviceWidth={1500}>
                    <FormContainer className="col-md-4 ml-auto mr-auto">
                        <SignInForm />
                    </FormContainer>
                </MediaQuery>

                <MediaQuery minDeviceWidth={1501}>
                    <FormContainer className="col-md-3 ml-auto mr-auto">
                        <SignInForm />
                    </FormContainer>
                </MediaQuery>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(SignIn);

const FormContainer = styled.div`
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    margin-top: 15vh;
    min-height: 70vh;
    border-radius: 15px;
    @media screen and (max-width: 600px) {
        margin-top: 3vh;
        min-height: 75vh;
    } 
`