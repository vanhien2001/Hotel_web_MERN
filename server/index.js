const express = require('express');
const cors = require('cors')
const path = require('path');
const http = require('http');
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const db = require('./src/db/connect');
const Route = require('./src/Route');

db.connect()

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


const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('send message', (conversationID) => {
        console.log('send message')
        io.emit('fetch message', conversationID)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnect');
    })
});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => { console.log(`Server started at port ${PORT}`)})
