//Creating a websocket
var server = require('ws').Server;
var s = new server({port: 5500});


s.on('connection', function(ws){  //will fire up if connection was successful
    ws.on('message', function(message){  //will fire up whenever user from client side sends a message to the server
        
        //message = JSON.parse(message)

        const text = message.toString()
        const t = JSON.parse(text)
        if (message.type =="name"){
            ws.personName = message.data
            return;
        }
        
        //console.log("Received: " + message.toString)
        console.log("Received: "+ t.data)

        /*
        if(message == "hello"){
            ws.send("hey there from the server");
        }*/

        //to broadcast message to every connected client - iterate over them
        s.clients.forEach(function e(client){
            if(client!=ws)
                client.send(JSON.stringify({
                    name:ws.personName,
                    data:message.data
                }))
        })

        //ws.send("From server:" + message)
    })

    //close will fire up whenever you lose a client
    //to know which client closed, we can use id
    ws.on('close', function(){
        console.log("I lost a client")
    })

    //Can connect multiple clients (different tabs)
    console.log("One more client connected")

    //Chat application - connect clients and broadcast a message to anyone who is online
})



//R
// var server = require('ws').Server;     // we import the webServer module 
// var s = new server({ port: 5501 });    // we choose port as 5500

// s.on('connection', function(ws) { 
//     ws.on('message', function(message) { 
//         // message = JSON.parse(message);
        
//         const text = message.toString();
//         const t = JSON.parse(text);

//         if(message.type == "name") {
//             ws.personName = message.data;
//             //console.log('hello');
//             return;
//         }

//         console.log('Recieved: ' + t.data); 

//         s.clients.forEach(function e(client) {
//             if(client != ws)
//             client.send(JSON.stringify({
//                 name: ws.personName,
//                 data: message.data
//             })); 
//         });

//         // ws.send('From Server: ' + message.toString()); 
//     });

//     ws.on('close', function() {
//         console.log('I lost a client!');   // whenever someone closes a tab it will print lost a client in the terminal
//     });
// });