import React, { Component } from 'react';
import './style.css'


class Signup extends Component {
    render() {
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
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>                                                                                                                                                                                                                                                                                    
                                                        <input className="form-control" placeholder="Email" name="loginname" type="text" autofocus/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                        <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign in"/>
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