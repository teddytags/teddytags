const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, './app')))
app.use('/lib', express.static(path.join(__dirname, '../lib')))
app.get('/', function(req, res) {
  res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>Document</title>
       <script src="./lib/browser/teddytags.js"></script>
       <script defer src="./event.js"></script>
   </head>
   <body>
       <myHeader name="header">Hello World!</myHeader>
       <lol>ClICK</lol>
       <script src="./app.js"></script>
   </body>
   </html>`)
})
app.listen(8080, () => {
  console.log('UP at 8080!!')
})
