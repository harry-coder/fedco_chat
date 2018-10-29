let express = require('express');
let bodyParser = require('body-parser');
var http = require('http').Server(express);
var io = require('socket.io')(http);

let app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
let port = process.env.PORT || 8080;


app.get('/', function (req, res) {

    res.send("Server Started in 3000")

});


io.on('connection', function (socket) {

    console.log("User is connected");


    socket.on('join', function (data) {


        socket.join(data.email);

        console.log(data.email + "has joined");

       // io.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

    });

    socket.on('send_message',function (data) {

        io.sockets.in(data.email).emit('receieve_message',{msg:data.msg});
    });
    socket.on('disconnect', function () {
        console.log("User is disconnected");

    });


});
app.listen(process.env.PORT || 3000, function () {

    console.log("Server started at port 3000")
});