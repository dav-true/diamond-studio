const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs')
const mysql = require('mysql')
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, responce, next) => {
    responce.setHeader('Access-Control-Allow-Origin', '*');
    next();
});



const config = {
    connectionLimit: 10,
    host: "35.205.140.1",
    user: "root",
    password: "0BaIFsDmubM0D1o4",
    database: "requests_db",
}

const pool = mysql.createPool(config);



pool.getConnection((err) => {
    if (!err) {
        console.log("Connected to MySQL");
    } else {
        console.log(err);
    }
    

})



app.get('/', (request, response) => {
    response.send("hah")
})

app.post('/writedata', (request, response) => {

    var name = request.body.name;
    var email = request.body.email;
    var title = request.body.title;
    var comment = request.body.comment;

    let data = {
        name: name,
        email: email,
        title: title,
        comment: comment
    }
    console.log("data")
    console.log(data)
    pool.getConnection((err, connection) => {
        connection.query(`INSERT INTO requests (NAME, EMAIL, TITLE, MESSAGE) VALUES (${mysql.escape(name)}, ${mysql.escape(email)}, ${mysql.escape(title)}, ${mysql.escape(comment)}) `, (err) => {
            if (err) {
                console.log(err)
            }
            connection.release()
        })
    })
})


app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is starting on port ${port}`)
    } else {
        console.log("Err")
    }
})