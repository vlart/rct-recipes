const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
require('dotenv').config({path: "variables.env"});
const Recipe = require('./models/Recipe')
const User = require('./models/User')
const cors = require('cors') 
const jwt = require ('jsonwebtoken')

const {graphiqlExpress, graphqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')



const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log('DB connected'))
    .catch(err => console.error(err));

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credintials: true
}
app.use(cors(corsOptions))

// set up a JWT Authentication middleware

app.use(async(req, res, next) => {
    const token = req.headers['authorization']
    if(token !== 'null') {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET)
            req.currentUser = currentUser
        } catch (err) {
            console.log(err)
        }
    }
    // console.log({token}, typeof token)
    next()
})


// Create graphql app

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(({currentUser})=>({ 
        schema,
        context: {
            Recipe, 
            User,
            currentUser
        }
    }))
)

const PORT = process.env.PORT || 4444;

app.listen(PORT, ()=>{
    console.log(`server lstng on port ${PORT}`)
});