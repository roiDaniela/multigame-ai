import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ChatBot from 'react-simple-chatbot';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PlayHotDog from "./PlayHotDog";
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props);

        //get All users
        this.users = {"302882527": "Roi"}
        this.state = {isHideChat: false};
        this.steps = [
            {
                id: '1',
                message: 'What is your name?',
                trigger: '2',
            },
            {
                id: '2',
                user: true,
                trigger: '3',
            },
            {
                id: '3',
                message: 'Hi {previousValue}, nice to meet you!',
                end: true,
            }
        ];

        // This binding is necessary to make `this` work in the callback
        this.hideChatbot = this.hideChatbot.bind(this);
    }

    getLastScore = (c_id) => {
        // var result = this.users.filter(obj => {
        //     return obj.id === c_id
        // })
        // return result.score;
        return 100;
    }

    getName = (c_id) =>{
        // var result = this.users.filter(obj => {
        //     return obj.id === c_id
        // })
        // return result.name;
    }

    hideChatbot(){
        this.setState(prevState => ({
            isHideChat: !prevState.isHideChat
        }));
    }

    render() {
        return (
            <div className="App">

                <Typography variant="display4" gutterBottom>
                    MultiGameAI
                </Typography>

                <Button onClick={this.hideChatbot} variant="contained" color="primary">
                    Start Bot
                </Button>

                {this.state.isHideChat && <ChatBot  recognitionEnable={true} steps={this.steps} />}
            </div>

        );
    }
}

export default Home;