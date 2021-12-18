const express = require('express');
const db = require('./src/db/connect');
const Route = require('./src/Route');
const cors = require('cors')
const path = require('path');

db.connect()

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });


app.use(cors())


Route(app)

app.listen(process.env.PORT || 5000, () => { console.log("Server started at port 5000") })
