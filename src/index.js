const http = require('http')
const urls = require('url')
const fs = require('fs')
const {readingWritingDataBase} = require('./handlerDataBase')
let contadorPeticiones = 0

let listaAcciones = []
const PORT = process.env.PORT || 3000 

const server = http.createServer((req,res) => {
    const {method,url} = req

    let parsedUrl = urls.parse(url,true)
    let path = parsedUrl.path.replace(/^\/+|\/+$/g,"")
    if(path == "") {
      path = "index.html"
    }
    let file = __dirname + "/public/" + path
    console.log(file)

    fs.readFile(file,function(err,content) {
       if(err) {
         res.statusCode = 404
         res.end()
         console.log(path)
       }
       else {
         switch(path) {
            case "index.html":
               if(contadorPeticiones > 0) {
                  break
               }
               contadorPeticiones++   
               res.writeHead(200,{"Content-Type":"text/html"})
               break; 
            case "style.css":
               res.writeHead(200,{"Content-Type": "text/css"}) 
               break;
            case "app.js":
               res.writeHead(200,{'Content-Type':'application/json'})
               break
         }
       }
       res.end(content)
    })
    if(method == 'GET' && url == "/productos") {
      res.statusCode = 200
      res.setHeader('Content-Type','application/json')
      res.write(JSON.stringify(readingWritingDataBase.reading()))
      res.end()
    }
    if(method == 'POST' && url == '/') {
        let parseoDeDato;
        req.on('data',(chunk) => {
           parseoDeDato = chunk
           listaAcciones.push(JSON.parse(chunk.toString()))
           readingWritingDataBase.writing(listaAcciones)            
        }).on('end',() => {
            console.log(parseoDeDato.toString())
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.write(JSON.stringify(parseoDeDato.toString()))
            res.end()
        })
    }
})

server.listen(PORT,() => {
   console.log(`Server on port`,PORT)
})
