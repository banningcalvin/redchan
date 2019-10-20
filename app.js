const express = require('express');
const http = require('http')
const app = express();
const port = 3000;

var server = http.createServer(app);
app.use(express.static('public'))

app.get("/board/:board", function(req, res){
    res.send(`get /board/${req.params.board}`);
 });


app.listen(3000, "localhost")