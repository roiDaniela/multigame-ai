import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ChatBot from 'react-simple-chatbot';
import Button from '@material-ui/core/Button';
import axios from 'axios';


import ReactDOM from 'react-dom';
import $ from 'jquery/src/jquery';
import List from './List';
import Viewer from './Viewer';
import Search from './Search';
import Chart from './d3Chart';
// import * as d3 from "d3";

class PlayHotDog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            items: [],
            data: [
            ]
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    componentWillMount() {
        axios.get('/items')
            .then(res => {
                console.log(res);
                this.setState({...res.data});
            });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    handleClick() {
        // get inner html of the input box
        // clear up the input box
        var imageUrl = $('.search-box')[0].value;

        // make an ajax call with the input box data
        axios.post('/items/search', {
            'imageUrl': imageUrl
        }).then(res => {
            console.log(res);
            this.setState({...res.data});
        });
    }

    render () {
        return (<div>
            <Search state={this.state} handleClick={this.handleClick} handleKeyPress={this.handleKeyPress}/>
            {this.state.imgUrl?(<Viewer imgUrl={this.state.imgUrl}/>):(false)}
            <List items={this.state.data}/>
            <Chart data={this.state.data}/>
        </div>)
    }
}

export default PlayHotDog;


