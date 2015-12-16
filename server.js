http = require('http');
fs = require('fs');
 
port = 6376;
host = '127.0.0.1';
 
postServer = http.createServer( function(req, res) {
 
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
 
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log("POST payload: " + body);
            fs.writeFile("server.log",body,function(err){
            	if (err)
            		console.log(err);
            })
        	res.end( '' );
        });
    }
    else
    {
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }
 
});
 
postServer.listen(port, host);
console.log('Listening at http://' + host + ':' + port);