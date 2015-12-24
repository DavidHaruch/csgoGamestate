'use strict';

var os = require('os');
var fs = require('fs');
var ifaces = os.networkInterfaces();

console.log("The following IP Addresses were detected: ");

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

console.log("Please type the correct IP below (or quit to exit):");

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
	
	if (text === 'quit\n' || text === 'quit\r\n') {
		exit();
	}
	
	next(text);
	
});

function exit() {
	process.exit();
}

function next(ip) {
	
	ip = ip.replace("\n", "").replace("\r", "");
	
	var client = fs.readFileSync("../static/client.js",{ encoding: 'utf8' });
	
	client = client.replace("SCRIPTMARKERIP", ip);
	fs.writeFile("../static/client.js", client, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("Your IP has been configured to " + ip + ", you may manually change this in static/client.js");
		process.exit();
	}); 
	
	
	
}

