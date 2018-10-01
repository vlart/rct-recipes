import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {SIGNUP_USER} from '../../queries'
import Error from '../Error'

const initialState = {
    username: "",
    password: "",
    email: "",
    passwordConfirmation: ""
}

class Signup extends Component {
    state = {...initialState}
    

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (e, signupUser) => {
        e.preventDefault()
        signupUser().then(({data}) => {
            console.log(data)
            localStorage.setItem('token', data.signupUser.token)
            this.clearState()
            this.props.history.push('/')

        })
    }

    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state
        const isInvalid = !username || !email || !password || password !== passwordConfirmation

        return isInvalid
    }

  render() {
      const {username, email, password, passwordConfirmation} = this.state
    return (
      <div>
        <h2 className="App">sign up</h2>
        <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
            {(signupUser, {data, loading, error}) => {

                return(
                <form action="" className="form" onSubmit={e => this.handleSubmit(e, signupUser)}>
                    <input type="text" name="username" id="" placeholder="username" value={username} onChange={this.handleChange}/><br/>
                    <input type="email" name="email" id=""  placeholder="email" value={email} onChange={this.handleChange} /><br/>
                    <input type="password" name="password" id=""  placeholder="pass" value={password} onChange={this.handleChange} /><br/>
                    <input type="password" name="passwordConfirmation" id="" value={passwordConfirmation}  placeholder="confirm pass" onChange={this.handleChange} /><br/>
                    <input type="submit" disabled={loading || this.validateForm()} className="button-primary" value="SUBMIT"/>
                    {error && <Error error={error}/>}
                </form>
                )
            }}
        </Mutation>
      </div>
    )
  }
}

export default  withRouter(Signup)