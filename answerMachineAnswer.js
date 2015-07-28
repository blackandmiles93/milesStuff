var net = require('net');
var fs = require('fs');
var port = 3000;
var id = 0;

// user should be able to leave a message
// read all messages
// delete all messages
// delete an individual message
// each message should be stored with an id (numeric) (most likely done as an array)

var server = net.createServer(function(c) { 

	console.log('client connected');

  c.on('data', function(data) {
    var message = fs.readFileSync('data.json', 'utf8');
    var incomingMsg = data.toString().trim();
    var command = incomingMsg.split(" ");
    var msg;
    if (message === "") {
      msg = {};
    }
    else {
      msg = JSON.parse(message);
    }

    if (command[0] === "list") {
      for (var i in msg) { // for in loop
        var string = i + " " + msg[i] + '\n';
        c.write(string);
      }
    }
    else if (command[0] === "delete") {
      if (command[1] === undefined) {
        msg = {};
      }
      else {
        delete msg[command[1]];
      }
      fs.writeFile('data.json', JSON.stringify(msg));
    }
    else {
    id++;
    msg[id] = incomingMsg;
    fs.writeFile('data.json', JSON.stringify(msg), function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("file updated");
      }
    });
    
  };



    // var msg = [];
    // var id = 1;
    // var Message = function(message) {
    //   this.message = message;
    // }
    // var newMessage = new Message(id + data.toString().trim()); 

    // msg.push(newMessage);
    // console.log(msg);

  });

  c.on('end', function() {
    console.log('client disconnected');
  });
});

server.listen(port, function() {
  console.log('listening on ' + port);
});