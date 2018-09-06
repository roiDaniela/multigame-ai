import React, { Component } from 'react';
import './style.css'


class Logout extends Component {
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
                                <form role="form" action="#" method="POST">
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
                                                    <input type="button" onClick={this.onClickLogout} className="btn btn-lg btn-primary btn-block" value="Sign Out"/>
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

export default Logout;