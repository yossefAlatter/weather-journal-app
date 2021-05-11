//== import modules needed ==//
//== start ==//

// import express
const express = require('express');

//import body-parser module 
const bodyParser = require('body-parser');

//import cors module 
const cors = require('cors');

//== end ==//

//-------------------------------------------------------------------------//

// create instant app from express 
const app = express();

//== use modules needed in the app ==//
//== start ==//

//use body-parser module in app 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//use cors module in app
app.use(cors());

//== end ==//

//-------------------------------------------------------------------------//

//== initialize folder that conatin our static files for project ==//
//== start ==//
app.use(express.static('website'));
//== end ==//

//-------------------------------------------------------------------------//

//== initialize data storage ==//
//== start ==//
let projectData = {};
//== end ==//

//-------------------------------------------------------------------------//

//==app router ==//
//== start ==//

app.post('/saveData', (req, res)=>{
    let newData = {
        city: req.body.city,
        weatherState: req.body.weatherState,
        temp: req.body.temp,
        userFeel: req.body.userFeel,
        weatherIcon: req.body.weatherIcon,
        currentTime: req.body.currentTime
    }
    projectData = newData;
    res.end();
});

app.get('/getData', (req, res)=>{
    res.send(projectData);
});

//== end ==//

//-------------------------------------------------------------------------//

//== declare server listening ==//
//== start ==//

//initialize port that server will run on it 
const PORT = process.env.PORT || 3000;

// start server to listen to comming requests
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});

//== end ==//

//-------------------------------------------------------------------------//