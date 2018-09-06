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
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Logout from './Logout/Logout'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/storage'
import {observer, inject} from 'mobx-react';


@inject('store')
@observer
class App extends Component {
    componentDidMount() {
        const obj = getFromStorage('accountInfo');
        
        if (obj && obj.token) {
          const {token} = obj;
          this.props.store({
            isLoading: true  
          })
          fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  token,
                  isLoading: false
                })
              } else {
                this.setState({
                  isLoading: false,
                })
              }
            })
        }
    }
    render() {
        return (
          <div className="App">
            <BrowserRouter>
                <div>

                    <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#">Welcome, Guest</a>
                        </div>
                        <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/reversi">Reversi</Link></li>
                        <li><Link to="/hotdog">Hot dog</Link></li>
                        <li><Link to="/tictactoe">Tic-Tac-Toe</Link></li>
                        <li><a href="mailto:balanga10@gmail.com?Subject=hotdog%20Contact">Contact me</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            <li><Link to="/logout"><span className="glyphicon glyphicon glyphicon-log-out"></span> Logout</Link></li>

                        </ul>
                    </div>
                    </nav>
                    <Route exact path="/" component={Home}/>
                    <Route path="/reversi" component={ReversiGame}/>
                    <Route path="/hotdog" component={PlayHotDog}/>
                    <Route path="/tictactoe" render={(props) => <TicTacToe {...props} singlePlayer={true} />}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/logout" component={Logout}/>
                </div>
            </BrowserRouter>
          </div>
        );
  }
}

export default App;