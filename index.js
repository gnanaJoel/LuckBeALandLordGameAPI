// ----------------------------------
// mongoose setup
// ----------------------------------
// 0. import the mongoose library
const mongoose = require("mongoose")

// url of your database
const mongoURL = "mongodb+srv://dbAdminUserJoel:dbjjgpass@cluster0.qaamb.mongodb.net/week9?retryWrites=true&w=majority";

// configuration options to use when connecting to the database
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// add your Luck Be A Landlord Game Datbase table schemas
const Schema = mongoose.Schema

// 2. define the Game Items table
const GameItemSchema = new Schema({
   name:String,
   rarity:String,
   description:String,
   gold_per_turn:String
})
const GameItem = mongoose.model("game_items_table", GameItemSchema)

// ----------------------------------
// express setup
// ----------------------------------
// import express
const express = require("express");
const app = express();

// configure express to accept data from the client as JSON format
app.use(express.json())

// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

// ----------------------------------
// Url endpoints
// ----------------------------------

// ----------------------------------
// connect to database & start server
// ----------------------------------
// start the server and output a message if the server started successfully
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}



mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("Connection success")
        app.listen(HTTP_PORT, onHttpStart);
    }
).catch(
    (err) => {
        console.log("Error connecting to database")
        console.log(err)
    }
)
   


