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

app.get('/getdata_temperature', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/getdata_temperature')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/dropdata_temperature', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/dropdata_temperature')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/getcleandata_temperature', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/getcleandata_temperature')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/getdata_fruit_all', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/getdata_fruit_all')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/dropdata_fruit_all', (req, res) => {
    axios
        .get('http://192.168.1.101:3000/dropdata_fruit_all')
        .then(response => {
            console.log(`statusCode : ${response.status}`)
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/getdata_fruit/:fruit', (req, res) => {
    const fruit = req.params.fruit;
    axios
        .get(`http://192.168.1.101:3000/getdata_fruit/${fruit}`)
        .then(response => {
            console.log(`statusCode: ${response.status}`);
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/dataframe_combined/:fruit', (req, res) => {
    const fruit = req.params.fruit;
    axios
        .get(`http://192.168.1.101:3000/dataframe_combined/${fruit}`)
        .then(response => {
            console.log(`statusCode: ${response.status}`);
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/graph_combined/:fruit', (req, res) => {
    const fruit = req.params.fruit;
    axios
        .get(`http://192.168.1.101:3000/graph_combined/${fruit}`)
        .then(response => {
            console.log(`statusCode: ${response.status}`);
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/get_map_fruit/:fruit', (req, res) => {
    const fruit = req.params.fruit;
    axios
        .get(`http://192.168.1.101:3000/get_map_fruit/${fruit}`)
        .then(response => {
            console.log(`statusCode: ${response.status}`);
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});


module.exports = app;