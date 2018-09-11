//Define Allof Require Module for This Project
//
//Http Module
var http = require('http');
//Url Module
var url = require('url');
//Path Module
var path = require('path');
//FileSystem Module
var fs = require('fs');


//Create array() For avilable mime types of this project
var mimeTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpeg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css"
    
};

//Crete Server functon
http.createServer(function(req, res){
    //Locate the Requested url
    var uri = url.parse(req.url).pathname;
    //Return the Current Working directory of the process
    var fileName = path.join(process.cwd(),unescape(uri));
    //Lets us know that its load the file from the uri
    console.log('Loading'+ uri);
    var stats;
    
    try{
        //Look for the requested file
        stats = fs.lstatSync(fileName);
    } catch(e){
        //if requested File not faund the sohw some message
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    
    //Check is file or directory
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type': mimeType});
        
        //Create a FileStream
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if(stats.isDirectory()){
        res.writeHead(302,{
            'Location' : 'index.html'
        });
        res.end();
    }
    //is not it file or directory then Show some Message
    else{
        res.writeHead(500, {'Content-type' : 'text/plain'});
        res.write('500 Internal Error\n');
        res.end();
    }
}).listen(3000);


