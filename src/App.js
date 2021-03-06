import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PlayHotDog from "./HotDogGame/PlayHotDog";
import Home from './HotDogGame/Home'
import ReversiGame from './ReversiGame/Game'
import TicTacToe from './Tictactoe/TicTacToe'
import Login from './Login'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Ai from "./ReversiGame/Reversiai";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    addName(e) {
        // e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
          <div className="App">
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/reversi" component={ReversiGame}/>
                    <Route path="/hotdog" component={PlayHotDog}/>
                    <Route path="/tictactoe" render={(props) => <TicTacToe {...props} singlePlayer={true} />}/>
                    <Route path="/login" component={Login}/>
                </div>
            </BrowserRouter>
          </div>
        );
  }
}

export default App;