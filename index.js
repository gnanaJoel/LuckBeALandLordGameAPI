// import express
const express = require("express");
const app = express();

// configure express to accept data from the client as JSON format
app.use(express.json())

// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

// start the server and output a message if the server started successfully
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}

app.listen(HTTP_PORT, onHttpStart);
   


