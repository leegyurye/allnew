const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const mongoose = require("mongoose");
const env = require('dotenv').config({ path: "../../.env" });
const axios = require('axios')

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
    res.send('Hello World~!!')
})

app.get('/select', (req, res) => {
    const result = connection.query('select * from combined_citrus');
    console.log(result);
    res.send(result);
})

app.get('/randomUUID', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/randomUUID')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})


module.exports = app;