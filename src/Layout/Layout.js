import React, { Component } from 'react';
import './LayoutStyle.css';
import styled from 'styled-components';
import signOutIcon from '../Images/signOut.png'
import { connect } from 'react-redux';

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

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {this.props.user.isLogged &&
                            <div>
                                {this.props.user.role === "TENANT" &&
                                    <a className="nav-item nav-link" href="/charges">Charges</a>
                                }
                                {this.props.user.role === "ADMIN" &&
                                    <a className="nav-item nav-link" href="/addManager">Add Manager</a>
                                }
                                <SignOut className="nav-item nav-link" href="/" onClick={this.signOut}>
                                    <img src={signOutIcon} width="40" height="38" className="d-inline-block align-top" alt="" />
                                </SignOut>
                            </div>
                            }
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

    @media screen and (max-width: 990px) {
        position: relative;
        margin-left: 10px;
    } 
`