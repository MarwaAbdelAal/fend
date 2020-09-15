// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, runServer);

function runServer() {
    console.log('server is running...');
    console.log(`running on server: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', getData);
app.post('/add', postData);

// Callback function to complete GET '/all'
function getData(req, res){
    res.json(projectData);
}

// Post Route
function postData(req, res) {
    let newEntery = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response,
    }
    projectData.push(newEntery);
    res.json(projectData);
}
