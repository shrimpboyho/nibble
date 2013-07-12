/*  

This file is part of nibble.

nibble is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

nibble is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with nibble.  If not, see <http://www.gnu.org/licenses/>.

*/

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

	// Serve index.nib if nothing else is present
	
	if(fileToServe == "/"){
	
		console.log("Serving index.nib");
	
		// Create file and serve it

		generateAndServe('index.nib',res);
		
	
	}else{

		fileToServe = fileToServe.substr(1,fileToServe.length);
	
		console.log("Serving " + fileToServe);
	
		// Create file and serve it

		generateAndServe(fileToServe,res);
	}
	
});

// Listen on ports

server.listen(port);

console.log("Listening on port " + port);

function generateAndServe(filepath,res){

	// Read in the raw file based on file path

	fs.readFile(filepath,function(err,data){
		if(data){
			
			// Contains the raw data in the file
			var outputFile;

			// Turn in into a string
			outputFile = data.toString();
			
			// Begin the generation and serving of the .nib file

			beginParsing(res, outputFile);
		}	
	});

}

// Actual parsing going on here

function beginParsing(res, outputFile){

	// Log file to console for debugging purposes
	
	console.log(outputFile);

	/** PARSING AND GENERATION OF MARKUP GOES HERE
	//	
	//	Heavily uses regular expressions
	//
	*/

	// Variable that stores the chunks of scripts found in the .nib file

	var allScripts = new Array();

    // Regex for finding code that is script

    var scriptTagsRegex = /<\?nib[\s\S]+\?>/im;

    // Log all the scripts to the console

	if((allScripts = scriptTagsRegex.exec(outputFile)) !== null){
	    
	    for(var i = 0; i < allScripts.length; i++){
	    	console.log("Found scripts:\n" + allScripts[i])
	    }
	    
	}




	// Serve the fully generated outputFile

	res.writeHeader(200, {"Content-Type": "text/html"});
	res.write(outputFile);
	res.end();
}

