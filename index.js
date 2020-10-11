/*
Application By: Lokesh Rawat
Aim: Get Google Trends Data

*/

// All Dependencies
const express = require('express')
const bodyparser = require('body-parser');
const googleTrends = require('./api/routes/googleTrend');

//Intialize Express Server
const app = express();

//Intialize Body Parser
app.use(bodyparser.json());

//All Routes
app.use('/api', googleTrends);

//PORT DeFine
const PORT = 3000;


//Start Server
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}...`)
})