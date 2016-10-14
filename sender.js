var net = require('net');

var HOST = '127.0.0.1';
var PORT = 3000;
var client = new net.Socket();
var i = 1;
client.connect(PORT, HOST, function() {

    console.log('CONECTAT LA: ' + HOST + ':' + PORT);
    // Scrie un mesaj catre socket la conectare, serverul primeste mesajul de la client 
    	// setInterval(function(){ 
    	// 	client.write('Mesajul nr. ' + i); i++;
    	// }, 1000);

    	client.write('Mesajul nr. 1\n');
    	client.write('Mesajul nr. 2\n');
    	client.write('Mesajul nr. 3\n');
    	client.write('Mesajul nr. 4\n');
    	client.write('Mesajul nr. 5\n');
	});

	// Adaugam un handler pt evenimentul 'data'
	// data este ceea ce serverul transmite catre socket
	client.on('data', function(data) {
	    console.log(data.toString());
	});

	client.on('error', function(){
  });

//Adaugam un handler pentru evenimentul 'close'
client.on('close', function() {
    console.log('Conexiune inchisa');
});
