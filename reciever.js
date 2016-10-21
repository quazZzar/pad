var net = require('net');

var HOST = '127.0.0.1';
var PORT = 3000;
var client = new net.Socket();
var i = 1;

function Message (type, message, error) {

    this.type = type;
    this.text = message;
    this.error = error;
}

client.connect(PORT, HOST, function() {

    var mesaj = 'CONECTAT LA: ' + HOST + ':' + PORT;
    var mess = new Message("get", mesaj, "");
        client.write(JSON.stringify(mess)); 
	});

	client.on('data', function(data) {
	    console.log(data.toString());
	});

	client.on('error', function(){
  });

//Adaugam un handler pentru evenimentul 'close'
client.on('close', function() {
    console.log('Conexiune inchisa');
});
