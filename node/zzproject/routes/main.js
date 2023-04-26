const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const mongoose = require("mongoose");
const env = require('dotenv').config({ path: "../../.env" });

//MySQL 연결 정보
var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// Moongo schema
var restbl = mongoose.Schema({
    resNumber: Number,
    userId: String,
    shopName: String,
    resDate: String,
    shopService: String,
    shopArea: String
}, {
    versionKey: false
})

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MY SQL > MONGO Insert 위한 Select
function resselect_result(req) {
    const result = connection.query('SELECT * FROM restbl');
    return result;
}

function template_nodata(res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>Result</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h3>데이터가 존재하지 않습니다.</h3>
    </body>
    </html>
    `;
    res.end(template);
}

function template_result2(result, res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>Result</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="mystyle.css" />
    </head>
    <body>
    <table border="1" style="margin:auto;">
    <thead>
        <tr><th>shopId</th><th>shopService</th><th>shopName</th><th>shopArea</th><th>shopAddr</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < result.length; i++) {
        template += `
    <tr>
        <td>${result[i]['shopId']}</td>
        <td>${result[i]['shopService']}</td>
        <td>${result[i]['shopName']}</td>
        <td>${result[i]['shopArea']}</td>
        <td>${result[i]['shopAddr']}</td>
    </tr>
    `;
    }
    template += `
    </tbody>
    </table>
    </body>
    </html>
    `;
    res.end(template);
}

// function template_result3(result, res) {
//     res.writeHead(200);
//     var template = `
//     <!doctype html>
//     <html>
//     <head>
//         <title>Result</title>
//         <meta charset="utf-8">
//         <link type="text/css" rel="stylesheet" href="mystyle.css" />
//     </head>
//     <body>
//     <table border="1" style="margin:auto;">
//     <thead>
//         <tr><th>resNumber</th><th>userId</th><th>shopName</th><th>resDate</th><th>shopService</th><th>shopArea</th></tr>
//     </thead>
//     <tbody>
//     `;
//     for (var i = 0; i < result.length; i++) {
//         template += `
//     <tr>
//         <td>${result[i]['resNumber']}</td>
//         <td>${result[i]['userId']}</td>
//         <td>${result[i]['shopName']}</td>
//         <td>${result[i]['resDate']}</td>
//         <td>${result[i]['shopService']}</td>
//         <td>${result[i]['shopArea']}</td>
//     </tr>
//     `;
//     }
//     template += `
//     </tbody>
//     </table>
//     </body>
//     </html>
//     `;
//     res.end(template);
// }

// 로그인
app.post('/login', (req, res) => {
    const { id, pw } = req.body;
    const result = connection.query("select * from usertbl where userid=? and passwd=?", [id, pw]);
    // console.log(result);
    if (result.length == 0) {
        res.redirect('error.html')
    }
    if (id == 'admin' || id == 'root') {
        console.log(id + " => Administrator Logined")
        // res.redirect('member.html?id=' + id)
        res.send('{"ok":true, "affectedRows":' + result.affectedRows + ', "service":"insert"}');
    } else {
        console.log(id + " => User Logined")
        // res.redirect('main.html?id=' + id)
        res.send('{"ok":true, "affectedRows":' + result.affectedRows + ', "service":"insert"}');
    }
})

// 회원가입 
app.post('/register', (req, res) => {
    const { id, pw, name, addr, num } = req.body;
    if (id == "") {
        res.redirect('register.html')
    } else {
        let result = connection.query("select * from usertbl where userid=? and passwd=? and userName=? and userAddr=? and userNumber=?", [id, pw, name, addr, num]);
        if (result.length > 0) {
            res.writeHead(200);
            var template = `
        <!doctype html>
        <html>
        <head>
            <title>Error</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div>
                <h3 style="margin-left: 30px">Registrer Failed</h3>
                <h4 style="margin-left: 30px">이미 존재하는 아이디입니다.</h4>
                <a href="register.html" style="margin-left: 30px">다시 시도하기</a>
            </div>
        </body>
        </html>
        `;
            res.end(template);
        } else {
            result = connection.query("insert into usertbl values (?, ?, ?, ?, ?)", [id, pw, name, addr, num]);
            console.log(result);
            res.send('{"ok":true, "affectedRows":' + result.affectedRows + ', "service":"insert"}');
            // res.redirect('/');
        }
    }
})


//SelectDong ' 동 (Area) ' 에 따른 Shop 조회
app.get('/selectDong', (req, res) => {
    const shopArea = req.query.shopArea;
    if (shopArea == "") {
        // res.send('원하는 동을 입력하세요.')
        res.write("<script>alert('원하는 동을 입력하세요')</script>");
    } else {
        const result = connection.query("SELECT * FROM shoptbl where shopArea=?", [shopArea]);
        console.log(result);
        // res.send(result);
        if (result.length == 0) {
            template_nodata(res);
        } else {
            template_result2(result, res);
        }
    }
})

// 전체 업체 검색
app.get('/select', (req, res) => {
    const result = connection.query('SELECT * FROM shoptbl');
    console.log(result);
    //res.send('{"ok":true, "affectedRows":' + result.affectedRows + ', "service":"insert"}');
    // res.send(result);
    if (result.length == 0) {
        template_nodata(res);
    } else {
        template_result2(result, res);
    }

})

// 예약 등록 
app.post('/insert', (req, res) => {
    const { resNumber, userId, shopName, resDate, shopService, shopArea } = req.body;
    if (resNumber == "" || userId == "" || shopName == "" || resDate == "" || shopService == "" || shopArea == "") {
        // res.send('정보를 빠짐없이 입력하세요.')
        res.write("<script>alert('정보를 빠짐없이 입력하세요.')</script>");
    } else {
        let result = connection.query("select * from restbl where resNumber=?", [resNumber]);
        if (result.length > 0) {
            res.writeHead(200);
            var template = `
        <!doctype html>
        <html>
        <head>
            <title>Error</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div>
                <h3 style="margin-left: 30px">Registrer Failed</h3>
                <h4 style="margin-left: 30px">이미 존재하는 아이디입니다.</h4>
            </div>
        </body>
        </html>
        `;
            res.end(template);
        } else {
            result = connection.query("insert into restbl values (?, ?, ?, ?, ?, ?)", [resNumber, userId, shopName, resDate, shopService, shopArea]);
            console.log(result);
            // res.redirect('/selectQuery?resNumber=' + req.body.resNumber);
            res.send('{"ok":true, "affectedRows":' + result.affectedRows + ', "service":"insert"}');
        }
    }
})

// // request O, query X
// app.get('/select2', (req, res) => {
//     const result = connection.query('SELECT * FROM restbl');
//     console.log(result);
//     // res.send(result);
//     if (result.length == 0) {
//         template_nodata(res);
//     } else {
//         template_result3(result, res);
//     }
// })

// define schema
var restblSchema = mongoose.Schema({
    resNumber: Number,
    userId: String,
    shopName: String,
    resDate: String,
    shopService: String,
    shopArea: String
})

// create model with mongodb collection and schema
var Restbls = mongoose.model('restbls', restblSchema);


// mongo insert
app.post('/mongoinsert', function (req, res) {
    let result = resselect_result(req)

    for (var i = 0; i < result.length; i++) {
        var resNumber = result[i].resNumber;
        var userId = result[i].userId;
        var shopName = result[i].shopName;
        var resDate = result[i].resDate;
        var shopService = result[i].shopService;
        var shopArea = result[i].shopArea;

        var restbls = new Restbls({ 'resNumber': resNumber, 'userId': userId, 'shopName': shopName, 'resDate': resDate, 'shopService': shopService, 'shopArea': shopArea })

        restbls.save(function (err, silence) {
            if (err) {
                console.log('err')
                res.status(500).send('insert error')
                return;
            } else {
                res.status(200).send("Inserted")
            }
        })
    }
})

module.exports = app;