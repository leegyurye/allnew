const axios = require('axios');

axios
    .post('http://192.168.1.190/todos', {
        todo: "Buy the milk"
    })
    .then(res => {
        console.log(`statusCode : ${res.status}`)
        console.log(res)
    })
    .cstch(error => {
        console.log(error)
    })