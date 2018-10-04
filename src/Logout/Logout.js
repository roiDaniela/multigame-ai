import React, { Component } from 'react';
import './style.css'
import { inject } from 'mobx-react'
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage'
import { withRouter } from 'react-router-dom'

@inject('store')
class Logout extends Component {

    
    onClickLogout = event => {
        const {
            loginEmail
        } = this.props.store.data;
        event.preventDefault();
        const obj = getFromStorage('accountInfo');
        
        if (obj && obj.token) {
          const {token} = obj;
          this.props.store.updateData({
            isLoading: true  
          })
          fetch('kobia.xyz:8080/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.props.history.push("/login");

                this.props.store.updateData({
                  token: '',
                  isLoading: false,
                  loginEmail: '',
                  loginPassword: '',
                  signUpFirstName: '',
                  signUpLastName: '',
                  signUpEmail: '',
                  signUpPassword: '',
                  signUpError: '',
                  loginError:'',
                  isLoading: false
                })
              } else {
                this.props.store.updateData({
                  isLoading: false,
                })
              }
            })
        }
    
      }
    render() {
        return (
            <div className="container" style={{"margin-top":"40px"}}>
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> Logout</strong>
                            </div>
                            <div className="panel-body">
                                <form >
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
                                                    <input type="button" onClick={this.onClickLogout} className="btn btn-lg btn-primary btn-block" value="Logout"/>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer ">
                                We will miss you!
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(Logout);