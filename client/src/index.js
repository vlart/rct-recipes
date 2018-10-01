import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
// import { onError } from 'apollo-link-error';
import withSession from './components/withSession'
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search'


const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation =>{
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError}) => { 
        if(networkError) {
            console.log('Netw Err', networkError)
        }
    }
})

const Root = ({refetch}) => (
    <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search"  component={Search} />
                <Route path="/signin"  render ={() => <Signin refetch={refetch} />}/>
                <Route path="/signup"  render ={() => <Signup refetch={refetch} />} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(
<ApolloProvider client = {client}>
    <RootWithSession />
</ApolloProvider>,
document.getElementById('root')
);

