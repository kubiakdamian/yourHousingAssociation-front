import React, { Component } from 'react';
import './LayoutStyle.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
//Images
import signOutIcon from '../Images/signOut.png';
import polish_flag from '../Images/poland_flag.png';
import uk_flag from '../Images/uk_flag.png';
import german_flag from '../Images/german_flag.png';

class Layout extends Component {

    signOut = () => {
        localStorage.removeItem('yhaToken');

        this.props.dispatch({
            type: "LOGOUT",
            data: {
                isLogged: false
            }
          });

        
        this.props.history.push("/");
    }

    changeLang = lang => {
        this.props.dispatch({
            type: "CHANGE_LANG",
            data: {
                language: lang
            }
          });
          console.log(lang);
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">YHA</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {this.props.user.isLogged &&
                            <div>
                                {this.props.user.role === "TENANT" &&
                                    <div className="navbar-nav">
                                        <a className="nav-item nav-link" href="/charges">Charges</a>
                                    </div>
                                }
                                {this.props.user.role === "ADMIN" &&
                                    <div className="navbar-nav">
                                        <a className="nav-item nav-link" href="/addManager">Add Manager</a>
                                        <a className="nav-item nav-link" href="/managers">Managers</a>
                                        <a className="nav-item nav-link" href="/addArticle">Add article</a>
                                    </div>
                                }
                                {this.props.user.role === "MANAGER" &&
                                    <div className="navbar-nav">
                                        <a className="nav-item nav-link" href="/unverifiedTenants">Tenants verification keys</a>
                                    </div>
                                }
                                <SignOut className="nav-item nav-link" href="/" onClick={this.signOut}>
                                    <img src={signOutIcon} width="40" height="38" className="d-inline-block align-top" alt="" />
                                </SignOut>
                            </div>
                            }
                            <Flags isLogged={this.props.user.isLogged}>
                                <Flag onClick={() => this.changeLang("PL")}>
                                    <img src={polish_flag} width="40" height="38" className="d-inline-block align-top" alt="polish_flag" />
                                </Flag>
                                <Flag onClick={() => this.changeLang("EN")}>
                                    <img src={uk_flag} width="40" height="38" className="d-inline-block align-top" alt="uk_flag" />
                                </Flag>
                                <Flag onClick={() => this.changeLang("DE")}>
                                    <img src={german_flag} width="40" height="38" className="d-inline-block align-top" alt="german_flag" />
                                </Flag>
                            </Flags>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user.user
    };
  };

export default connect(mapStateToProps)(Layout);

const SignOut = styled.a`
    position: absolute;
    right: 10px;
    bottom: 1px;

    @media screen and (max-width: 768px) {
        position: relative;
        margin-left: 10px;
    } 
`

const Flag = styled.a`
    float: right;
    margin-right: 1vw;

    &:hover{
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        float: left;
    } 
`

const Flags = styled.div`
    position: absolute;
    right: ${props => props.isLogged ? '7vw' : '2vw'};
    bottom: 1.1vh;

    @media screen and (max-width: 768px) {
        position: relative;
        margin-left: 6vw;
    } 
`