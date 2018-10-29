let express = require('express');
let bodyParser = require('body-parser');
var http = require('http').Server(express);
var io = require('socket.io')(http);

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
let port = process.env.PORT || 8080;


app.get('/', function (req, res) {

    res.sendFile('index.html');

});


io.on('connection', function (socket) {

    console.log("User is connected");


    socket.on('join', function (userName) {

        console.log(userName + "has joined");

        io.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

    });
    socket.on('disconnect', function () {
        console.log("User is disconnected");

    });


});
http.listen(port, function () {

    console.log("Server started at port 8080")
});