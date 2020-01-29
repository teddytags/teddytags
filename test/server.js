const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, './app')))
app.use('/lib', express.static(path.join(__dirname, '../lib')))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname , './app/index.html'));
});
app.listen(8080, () => {
    console.log('UP at 8080!!')
})