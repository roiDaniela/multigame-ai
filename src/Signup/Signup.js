import React, { Component } from 'react';
import './style.css'
import { inject, observer} from 'mobx-react'


@inject('store')
@observer
class Signup extends Component {
    onChangeGeneric = event => {
        this.props.store.updateData({
            [event.target.name]: event.target.value
        })
    }
    onClickSignUp = event => {
    //  console.log('inside onClickLogin')
        const {
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
        } = this.props.store.data;
        //console.log(loginEmail+" "+loginPassword)
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
                firstName: signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword
            })
        })
            .then(res => res.json())
            .then(json => {
            if (json.success) {
                //console.log("json.token"+json.token)
                // setInStorage('accountInfo',{token: json.token});
                this.props.store.updateData({
                    signUpFirstName: "",
                    signUpLastName: "",
                    signUpEmail: "",
                    signUpPassword: "",
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
                                <form role="form" action="#" method="POST">
                                    <fieldset>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                {signUpError? <div> signUpError </div> : false}
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="First Name" name="signUpFirstName" type="text" onChange={this.onChangeGeneric} value={signUpFirstName} autofocus/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="Last Name" name="signUpLastName" onChange={this.onChangeGeneric} type="text" value={signUpLastName} autofocus/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="Email" name="signUpEmail" onChange={this.onChangeGeneric} type="text" value={signUpEmail} autofocus/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                        <input className="form-control" placeholder="Password" name="signUpPassword" onChange={this.onChangeGeneric} type="password" value={signUpPassword}/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onClickSignUp} value="Sign Up"/>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer ">
                                Already have an account? <a href="#" onClick=""> Login Here </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Signup;