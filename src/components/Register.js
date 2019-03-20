import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {onRegisterUser} from '../actions'


class Register extends Component{

    onRegisterClick = () =>{
        const user = this.username.value
        const pass = this.password.value
        const email = this.email.value
        
        if(user !=="" && pass !=="" && email !==""){
            this.props.onRegisterUser(user,email,pass)
        } else if(user ==="" && pass ==="" && email ==="") {
            alert(`all required values are blank`)
        } else if(user ==="" && pass ===""){
            alert(`username & password cannot be blank`)
        } else if(pass ==="" && email ===""){
            alert(`password & email cannot be blank`)
        } else if(email==="" && user ===""){
            alert(`username & email cannot be blank`)
        } else if (user===""){
            alert(`username cannot be blank`)
        } else if (pass===""){
            alert(`password cannot be blank`)
        } else {
            alert(`email cannot be blank`)
        }
    }

    onErrorRegister =()=>{ 
        if(this.props.error !==""){
            return (
                
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        } else {
            return null
        }
        
    }

    onSuccessRegister = () =>{
        if(this.props.success !==""){
            return (
                <div className="alert alert-success mt-4">
                    {this.props.success}
                </div>
            )
        }
        else {
            return null
        }
    }


    render(){

        if(this.props.username ===""){
            return(
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Register</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group">
                                {/* capture from input username */}
                                <input ref={input => { this.username = input }} className="form-control" type="text" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group">
                                {/* capture from input password */}
                                <input ref={input => { this.password = input }} className="form-control" type="password" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group">
                                {/* capture from input email */}
                                <input ref={input => { this.email = input }} className="form-control" type="text" />
                            </form>
                            {/* action after Register button is clicked */}
                            <button className="btn btn-success btn-block mt-5" onClick={this.onRegisterClick}>Register</button>
                            {/* Notif */}
                            {this.onErrorRegister()}
                            {this.onSuccessRegister()}

                            <p className="lead">Already have account ? <Link to="/Login">Sign In!</Link></p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<Redirect to="/" />)
        }
        
    }  
}

const mapStateToProps = state =>{
    return {
        username: state.auth.username,
        error: state.auth.error,
        success: state.auth.success
    }
}

export default connect (mapStateToProps,{onRegisterUser})(Register)