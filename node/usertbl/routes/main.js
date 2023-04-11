const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const env = require('dotenv').config({ path: "../../.env" });

var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('회원 정보를 입력하세요')
})

app.get('/select', (req, res) => {
    const result = connection.query('select * from UserTBL');
    console.log(result)
    res.send(result)
})

app.get('/selectQuery', (req, res) => {
    const UserId = req.query.UserId;
    const result = connection.query("select * from UserTBL where UserId=?", [UserId]);
    console.log(result);
    res.send(result); 
})

app.post('/insert', (req, res) => {
    const { id, pw, name, addr, num } = req.body;
    const result = connection.query("insert into UserTBL values (?, ?, ?, ?, ?)", [id, pw, name, addr, num]);
    console.log(result);
    res.redirect('/selectQuery?UserId=' + req.body.id);
})

app.post('/update', (req, res) => {
    const { id, pw, name, addr, num } = req.body;
    const result = connection.query("update UserTBL set Password=? where UserId=?", [pw, id]);
    console.log(result);
    res.redirect('/selectQuery?UserId=' + req.body.id);
})

app.post('/delete', (req, res) => {
    const id = req.body.id;
    const result = connection.query("delete from UserTBL where userid=?", [id]);
    console.log(result);
    res.redirect('/select');
})

module.exports = app;