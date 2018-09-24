import React, { Component } from 'react';
import './style.css'
import { inject, observer } from 'mobx-react';
import 'whatwg-fetch';
import {  Link } from 'react-router-dom'

@observer
@inject('store')
class Signup extends Component {
    onChangeGeneric = event => {
            this.props.store.updateData({
            [event.target.name]: event.target.value
        })
    }
    onClickSignUp = event => {
        //  console.log('inside onClickLogin')
        event.preventDefault();
        const {
            isLoading,
            token,
            signUpError,
            loginError,
            loginEmail, 
            loginPassword,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
            
          } = this.props.store.data;
        
        this.props.store.updateData({
            isLoading: true
        })
        console.log(this.props.store.data)
        fetch('http://localhost:8080/api/account/signup', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName:signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
            console.log("json.token"+json.token)
            //setInStorage('accountInfo',{token: json.token});
            this.props.store.updateData({
                loginEmail: signUpFirstName,
                loginPassword: signUpPassword,
                signUpFirstName: '',
                signUpLastName: '',
                signUpEmail: '',
                signUpPassword: '',
                signUpError: json.message,
                isLoading: false
            }) 
            } else {
            this.props.store.updateData({
                signUpError: json.message,
                isLoading: false
            })
            }
        })
        
    }
    render() {
        const {
            isLoading,
            token,
            signUpError,
            loginError,
            loginEmail, 
            loginPassword,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
            
          } = this.props.store.data;
        return (
            <div className="container" style={{"margin-top":"40px"}}>
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> Sign Up to continue</strong>
                            </div>
                            <div className="panel-body">
                                <form >
                                    <fieldset>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-10 col-md-offset-1 ">
                                            <div className="form-group">
                                            {signUpError? <p className="text-danger">{signUpError}</p>: null}
   
                                                <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className=" glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="First Name" name="signUpFirstName" type="text" autoFocus value={signUpFirstName} onChange={this.onChangeGeneric}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon-envelope glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="Last Name" name="signUpLastName" value={signUpLastName} type="text" onChange={this.onChangeGeneric} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon-envelope glyphicon "></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="Email" name="signUpEmail" type="email" value={signUpEmail} onChange={this.onChangeGeneric} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                        <input className="form-control" placeholder="Password" name="signUpPassword" type="password" onChange={this.onChangeGeneric} value={signUpPassword}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" onClick={this.onClickSignUp} className="btn btn-lg btn-primary btn-block" value="Sign Up"/>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer ">
                                Already have an account? <Link to="/login"> Login Here </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Signup;