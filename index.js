const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//let port = process.env.PORT || 8080;


var peopleList = [];
app.get('/', function (req, res) {

    res.send("Server Started in 3000")

});


io.on('connection', function (socket) {

    console.log("User is connected");


    socket.on('join', function (data) {

        var peopleObject = {name: data.name, email: data.email};
        peopleList.push(peopleObject);


        socket.join(data.email);

        console.log(JSON.stringify(data) + " has joined");


        io.sockets.emit("person_list", peopleList)

        // io.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

    });

    socket.on('send_message', function (data) {

        console.log("This is the data received " + JSON.stringify(data));
        io.sockets.in(data.email).emit('receieve_message', {msg: data.msg, user: "sender"});
    });
    socket.on('disconnect', function (data) {
        console.log("This is data received " + data);
        console.log(data + " is disconnected");


    });

    socket.on('remove_user', function (data) {

        /*for(var i=0;i<peopleList.length;i++){

            if(peopleList[i].email===data){
                console.log("inside slice");
                peopleList.slice(i);
            }

        }*/

        peopleList = peopleList.filter(person => person.email !== data);

        /* console.log("This is the list " + peopleList.length);
         for (var i = 0; i < peopleList.length; i++) {

             console.log(peopleList[i].name);
             console.log(peopleList[i].email);

         }*/


        io.sockets.emit('updated_list', peopleList);
        console.log("This is data received " + data);
        console.log(data + " is disconnected");


    });


});
server.listen(process.env.PORT || 3000, function () {

    console.log("Server started at port 3000")
});