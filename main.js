var outputFile;

// Require the stuff we need

var fs = require('fs');
var http = require('http');

// Set up port based on argument on command line

var port = process.argv[2];

// Make a server out of it

var server = http.createServer();

server.on('request',function(req,res){
	
	// Determine file to serve
	
	var fileToServe = req.url.toString();
	fileToServe = fileToServe.substr(1,fileToServe.length);
	
	console.log("Serving " + fileToServe);
	
	// Create file and serve it

	readFile(fileToServe,res);
	
	
});

// Listen on ports

server.listen(port);

console.log("Listening on port " + port);

function readFile(filepath,res){

	fs.readFile(filepath,function(err,data){
		if(data){
			outputFile = data.toString();
			beginParsing(res);
		}	
	});

}

// Actual parsing going on here

function beginParsing(res){

	// Log file
	console.log(outputFile);

	// Modify file

	// Serve it
	res.writeHeader(200, {"Content-Type": "text/html"});
	res.write(outputFile);
	res.end();
}

