// ----------------------------------
// mongoose setup
// ----------------------------------
// 0. import the mongoose library
const mongoose = require("mongoose")

// url of your database
const mongoURL = "mongodb+srv://dbAdminUserJoel:dbjjgpass@gameitemscluster.qs7ip.mongodb.net/luck_be_a_landlord_game_database?retryWrites=true&w=majority";

// configuration options to use when connecting to the database
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// add your Luck Be A Landlord Game Datbase table schemas
const Schema = mongoose.Schema

// 2. define the Game Items table
const GameItemSchema = new Schema({
    name:String,
    rarity:String,
    description:String,
    "gold per turn":String
})

const GameItem = mongoose.model("GameItem", GameItemSchema, "game_items_table")

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
// GET All/View List of Game Items
app.get("/api/items", (req, res) => {
    // 1. search the database for students and return them
    GameItem.find().exec().then(
        (gameItems) => {
            if(gameItems === null){
                const message = {
                    statusCode:404,
                    message:"No Game Items found in database"
                }
                console.log(message)
                res.status(404).send(message)
            }
            else {
                console.log(gameItems)
                res.status(200).send(gameItems)
            }
        }
    ).catch(
        (err) => {
            const message = {
                statusCode:500,
                message:"Error when getting game items from database."
            }
            console.log(err)
            res.status(500).send(message)
        }
    )
})

// GET ONE/View a Single Game Item
app.get("/api/items/:item_name", (req,res) => {
    // 1. Determine which stduent the user wants
    // - by looking at the url parameters
    console.log(`Searching for: ${req.params.item_name}`)
  
    // 2. Then you make the query to the database
    // --  this is mongoose syntax, its not express, its not javascript
    GameItem.findOne({"name":req.params.item_name}).exec()
        .then(
            (gameItem) => {
                console.log(`Result from database: `)
                console.log(gameItem)
                if (gameItem === null) {
                    console.log("Game Item Record not found")
                    // ????? what are you going to send back if the record was not found
                    const message = {
                        statusCode:404,
                        message:"Game Item Record not found"
                    }
                    res.status(404).send(message)
                }
                else {
                    console.log("Game Item found")
                    res.status(200).send(gameItem)                   
                }
               
            }
        ).catch(
            (err) => {
                console.log(`Error`)
                console.log(err)
                const message = {
                    statusCode:500,
                    message:"Error when getting game items from the database"
                }
                res.status(500).send(message)
            }
        )
 })

 // INSERT/Add a New Game Item
app.post("/api/items", (req, res) => {
 
    // 1. what did the client send us
    // - what data does the client want us insert into the database
    console.log("I received this from the client:")
    console.log(req.body)
   
    // 2. Take that information and CREATE someone in your database!
    // - mongoose
  
    GameItem.create(req.body).then(
        (result) => {
            //javascript
            console.log("Game Item Created successfully!")
            console.log(result)
            const message = {
                statusCode:201,
                message:"Game Item Inserted successfully!"
            }
            // express
            res.status(201).send(message)
        }
    ).catch(
        (err) => {
            console.log(`Error`)
            console.log(err)
            const message = {
                statusCode:500,
                message: "Error when getting game items from database."
            }
            res.status(500).send(message)
        }
    )
 })


// ----------------------------------
// connect to database & start server
// ----------------------------------
// start the server and output a message if the server started successfully
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}

mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("Connected successfully to the remote database")
        app.listen(HTTP_PORT, onHttpStart);
    }
).catch(
    (err) => {
        console.log("Error connecting to database")
        console.log(err)
    }
)
   


