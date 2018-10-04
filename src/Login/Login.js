import React, { Component } from 'react';
import './style.css'
import { observer, inject } from 'mobx-react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage'
import {  Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

@inject('store')
@observer
class Login extends Component {
    onChangeGeneric = event => {
            this.props.store.updateData({
            [event.target.name]: event.target.value
        })
    }
    onClickLogin = event => {
        //  console.log('inside onClickLogin')
        event.preventDefault();
          const {
            loginEmail,
            loginPassword,
            
          } = this.props.store.data;
          console.log(loginEmail+" "+loginPassword)
          this.props.store.updateData({
            isLoading: true
          })
          console.log(this.props.store.data)
          fetch('http://kobia.xyz:8080/api/account/login', { 
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: loginEmail,
              password: loginPassword
            })
          })
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                console.log("json.token"+json.token)
                this.props.history.push("/")
                setInStorage('accountInfo',{token: json.token});
                this.props.store.updateData({
                  loginEmail: "",
                  loginPassword: "",
                  token: json.token,
                  loginError: json.message,
                  isLoading: false
                }) 
              } else {
                this.props.store.updateData({
                  loginError: json.message,
                  isLoading: false
                })
              }
            })
      
        }
    render() {
        const { 
            loginError,
            loginEmail,
            loginPassword
        } = this.props.store.data;
        return (
            <div className="container" style={{"margin-top":"40px"}}>
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> Login to continue</strong>
                                
                            </div>
                            <div className="panel-body">
                                <form  >
                                    <fieldset>
                                        <div className="row">
                                            <div className="center-block">
                                                <img className="profile-img"
                                                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt=""/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                <div className="form-group">
                                                {
                                                    loginError ? (
                                                        <p>{loginError}</p>
                                                    ) : null
                                                }
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-envelope"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input onChange={this.onChangeGeneric} className="form-control" placeholder="Email" name="loginEmail" type="email" value={loginEmail} autoFocus/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                        <input onChange={this.onChangeGeneric} className="form-control" placeholder="Password" name="loginPassword" type="password" value={loginPassword}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" onClick={this.onClickLogin} className="btn btn-lg btn-primary btn-block" value="Login"/>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer ">
                                Don't have an account? <Link to="/signup"> Sign Up Here </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default  withRouter(Login);