var net = require('net');
var fs = require('fs');
var HOST = '127.0.0.1';
var PORT = 3000;

// in acest array salvam fiecare client
var clients = [];
var messages = {queue:[]};

function Message (queue, type, message, error) {
    this.queue = queue;
    this.type = type;
    this.text = message;
    this.error = error;
}

// Cream o instanta de server si legam portul de ea.
// Functia din net.CreateServer() devine handler pentru evenimentul 'connection'
// Obiectul socket devine UNIC pentru fiecare conexiune.
net.createServer(function(socket) {

    //il identificam pe fiecare
	socket.name = "User:" + socket.remotePort;
    //si dupa asta il "impingem" in array-ul clients
    clients.push(socket);
    console.log("S-a mai conectat un User. Total useri: " + clients.length);
    //la conectare ii afisam un mesaj de intampinare
	socket.write("Salut " + socket.name + "\n");
	
    // Avem o conexiune - un obiect socket este atribuit ei automat.
    broadcast(socket.name + " joined the chat\n", socket);
    
    // Adaugam un handler pentru 'data' event al aceastei instante de socket
    socket.on('data', function(data) {
        
        primit = JSON.parse(data);
        if(primit.type == 'post'){
          messages.queue.push(primit.text);
         	var json = JSON.stringify(messages);
          fs.writeFile('messages.txt', json, 'utf8');
          // scriem date pentru socket, clientul va primi datele ca date de la server
          broadcast(socket.name + ": " + primit.text +"\n", socket);
        } else if(primit.type == "get"){
          console.log('reciever conectat');
          socket.write(messages);
        }
        //console.log(primit.text);
    });

    // Remove the client from the list when it leaves
  	socket.on('end', function () {
    	clients.splice(clients.indexOf(socket), 1);
    	broadcast(socket.name + " left the chat.\n");
  	});
    
    // Send a message to all clients
  	function broadcast(message, sender) {
    	clients.forEach(function (client) {
     		// Don't want to send it to sender
      		if (client === sender) return;
      		client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

  socket.on('error', function(){
  })
    
}).listen(PORT, HOST);

console.log('Server pornit pe adresa ' + HOST +':'+ PORT);
