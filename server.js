var net = require('net');

var HOST = '127.0.0.1';
var PORT = 3000;

// Cream o instanta de server si legam portul de ea.
// Functia din net.CreateServer() devine handler pentru evenimentul 'connection'
// Obiectul socket devine UNIC pentru fiecare conexiune.
net.createServer(function(socket) {
    
    // Avem o conexiune - un obiect socket este atribuit ei automat.
    console.log('S-a conectat: ' + socket.remoteAddress +':'+ socket.remotePort);
    
    // Adaugam un handler pentru 'data' event al aceastei instante de socket
    socket.on('data', function(data) {
        
        console.log('Clientul ' + socket.remoteAddress + ': ' + data);
        // scriem date pentru socket, clientul va primi datele ca date de la server
        socket.write('"' + data + '"');
        
    });
    
    // Adaugam un hadler pentru evenimentul 'close' al fiecarui socket
    socket.on('close', function(data) {
        console.log('Conexiunea: ' + socket.remoteAddress +' '+ socket.remotePort + ' s-a inchis.');
    });
    
}).listen(PORT, HOST);

console.log('Server pornit pe adresa ' + HOST +':'+ PORT);
