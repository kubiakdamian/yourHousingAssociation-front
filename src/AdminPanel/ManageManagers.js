import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

class ManageManagers extends Component {
    constructor(props){
        super(props);

        this.state = {
            managers: [{}]
        };
    }

    componentDidMount(){
        this.getManagers();
    }

    getManagers = () => {
        axios({ 
            method: 'get',
            url: `http://localhost:8080/authentication/user/managers`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.setState({
                managers: response.data
            })
        })
        .catch(error => {

        }); 
    }

    deleteManager = id => {
        axios({ 
            method: 'delete',
            url: `http://localhost:8080/authentication/user/manager/${id}`,
            headers: {
                'Authorization': localStorage.getItem('yhaToken')
            }
        })
        .then(response => {
            this.getManagers();
        })
        .catch(error => {
            NotificationManager.error('Please try again', 'Something went wrong', 3000); 
        }); 
    }

    render() {
        return (
            <div className="col-md-6 ml-auto mr-auto">
                {!_.isEmpty(this.state.managers[0]) &&
                    this.state.managers.map(manager =>
                        <ManagerBox key={"manager" + manager.id}>
                            <ManagerName>{manager.username}</ManagerName>
                            <DeleteIcon onClick={() => this.deleteManager(manager.id)}>
                                <img
                                    src={require("../Images/delete_icon.png")}
                                    alt="delete_icon"
                                />
                            </DeleteIcon>
                        </ManagerBox>
                    )
                }
            </div>
        );
    }
}

export default ManageManagers;

const ManagerBox = styled.div`
    min-height: 14vh;
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    margin-top: 3vh;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;

    @media screen and (max-width: 768px) {
        min-height: 15vh;
    } 
`

const ManagerName = styled.div`
    padding-top: 3vh;
    padding-left: 2vw;

`

const DeleteIcon = styled.div`
    position: absolute;
    top: 18%;
    right: 3%;

    &:hover{
        cursor: pointer;
    }

    img{
        width: 64px;

        @media screen and (max-width: 768px) {
            width: 50px;
        } 
    }
`