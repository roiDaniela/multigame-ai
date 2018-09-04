import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ChatBot from 'react-simple-chatbot';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Home extends Component {
    constructor(props) {
        super(props);

        //get All users
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
                trigger: '4',
            },
            {
                id: '4',
                message: 'Please choose which game you want to play',
                trigger: '5',
            },
            {
                id: '5',
                options: [
                    { value: "hotdog", label: 'hotdog', trigger: '6' },
                    { value: "tictactoe", label: 'tictactoe', trigger: '6' },
                    { value: "reversi", label: 'reversi', trigger: '6' },
                ],
            },
            {
                id: '6',
                message: 'You choose {previousValue}',
                end: true,
            },
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

    handleEnd({ steps, values }) {
        // console.log(steps);
        // console.log(values);
        if(`${values[1]}` == "hotdog"){
            window.location = '/hotdog'
        }
        else if(`${values[1]}` == "tictactoe"){
            window.location = '/tictactoe'
        }
        else if(`${values[1]}` == "reversi"){
            window.location = '/reversi'
        }
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

                {this.state.isHideChat && <ChatBot  handleEnd={this.handleEnd} recognitionEnable={true} steps={this.steps} />}
            </div>

        );
    }
}

export default Home;