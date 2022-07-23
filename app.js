
// const db = require("./database/db")
require("dotenv").config()
var PORT = process.env.PORT || 3000; 
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

let routes = require("./routes/path.routes")
app.use(routes)


app.listen(PORT,()=>{
    console.log(`server starting at ${PORT}`);
})