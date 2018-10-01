import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {SIGNIN_USER} from '../../queries'
import Error from '../Error'
import {withRouter} from 'react-router-dom'

const initialState = {
    username: "",
    password: "",
}

class Signin extends Component {
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

    handleSubmit = (e, signinUser) => {
        e.preventDefault()
        signinUser().then(async({data}) => {
            console.log(data)
            localStorage.setItem('token', data.signinUser.token)
            await this.props.refetch()
            this.clearState()
            this.props.history.push('/')
        })
    }

    validateForm = () => {
        const {username, password} = this.state
        const isInvalid = !username || !password
        return isInvalid
    }

  render() {
      const {username, password} = this.state
    return (
      <div>
        <h2 className="App">sign in</h2>
        <Mutation mutation={SIGNIN_USER} variables={{username, password}}>
            {(signinUser, {data, loading, error}) => {

                return(
                <form action="" className="form" onSubmit={e => this.handleSubmit(e, signinUser)}>
                    <input type="text" name="username" id="" placeholder="username" value={username} onChange={this.handleChange}/><br/>
                    <input type="password" name="password" id=""  placeholder="pass" value={password} onChange={this.handleChange} /><br/>
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

export default withRouter(Signin)