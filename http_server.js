//down graded node js from the most lates to below version. It looks worked after this
// npm i node-fetch@2.6.1

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const superagent = require('superagent');
const express = require('express');
const app = express();
var lowDB = require('lowdb');
var dfs = require("lowdb/adapters/FileSync");
const adp = new dfs("db.json");
const db  = lowDB(adp);
const bParser = require('body-parser');
//db.defaults({users:[{}]}).write();

app.use(express.static('public'));
//const url = 'http:localhost:3001/adduser' put this in html file that is on public folder;
app.use(bParser.urlencoded({extended:false}));
app.use(bParser.json());
app.get("/data", function(req, res){
  res.send(db.get('users').value());
});


 app.post('/adduser', function(req, res){
    db.get('users').remove().write();
    db.get('users').push(req.body).write();
    res.set('Content-Type', 'application/json');
    res.set('Status', 'Succcess');
    res.set('statuscode', 200);
    res.send(db.get('users').value())
    console.log('post request reached to this');
  });

app.listen(3000, function(){
   console.log('Http server running on port 3000');
})

