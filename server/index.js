const express = require("express");
const app = express();
const mysql = require('mysql');
const credentials = require('./credentials.json');

const db = mysql.createConnection({
    host: credentials['host'],
    user: credentials['user'],
    password: credentials['password'],
    database: credentials['database'],
})

app.get("/", (req,res) => {
    res.send("Hello galaxy")
    const sqlInsert = "INSERT INTO courses (name) VALUES ('CSE 214');"
    db.query(sqlInsert, (err,result) => {
        // don't put res.send in here, or else you get a cryptic error
    })

});

app.listen(3001, ()=> {
    console.log("running on port 3001")
})