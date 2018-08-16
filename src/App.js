import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import Button from '@material-ui/core/Button';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isHideChat: false};
        this.steps = [
                {
                    id: '1',
                    message: 'Welcome to Multi-Game AI!',
                    trigger: '2',
                },
                {
                    id: '2',
                    message: 'What is your name?',
                    trigger: '3',
                },
                {
                    id: '3',
                        user: true,
                    trigger: '4',
                },
                {
                    id: '4',
                        message: 'Hi {previousValue}, your last score is 100!',
                    trigger: '5',
                },
                {
                    id: '5',
                        message: '{previousValue} Select your game and enjoy!',
                    end: true,
                }
        ];

        // This binding is necessary to make `this` work in the callback
        this.hideChatbot = this.hideChatbot.bind(this);
    }

    hideChatbot(){
        this.setState(prevState => ({
            isHideChat: !prevState.isHideChat
        }));
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>

            <Button onClick={this.hideChatbot} variant="contained" color="primary">
              Hello World
            </Button>

              {this.state.isHideChat && <ChatBot steps={this.steps} />}
          </div>
        );
  }
}

export default App;


