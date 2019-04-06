import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

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
            url: `http://localhost:8081/user/managers`,
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
        console.log(id);
        axios({ 
            method: 'post',
            url: `http://localhost:8081/user/manager/delete/${id}`,
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
        console.log(this.state.managers);
        return (
            <div className="col-md-6 ml-auto mr-auto">
                {this.state.managers.map(manager =>
                     <ManagerBox key={"manager" + manager.id}>
                        <ManagerName>{manager.email}</ManagerName>
                        <DeleteIcon onClick={() => this.deleteManager(manager.id)}>
                            <img
                                src={require("../Images/delete_icon.png")}
                            />
                        </DeleteIcon>
                     </ManagerBox>
                )}
            </div>
        );
    }
}

export default ManageManagers;

const ManagerBox = styled.div`
    min-height: 10vh;
    background: rgb(145,145,145);
    background: radial-gradient(circle, rgba(145,145,145,1) 0%, rgba(0,0,0,1) 100%);
    margin-top: 3vh;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;
`

const ManagerName = styled.div`
    padding-top: 3vh;
    padding-left: 2vw;

`

const DeleteIcon = styled.div`
    position: absolute;
    top: 15px;
    right: 30px;

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