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

function template_nodata(res) {
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
        <h3>데이터가 존재하지 않습니다.</h3>
    </body>
    </html>
    `;
    res.end(template);
}

function template_result(result, res) {
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
        <tr><th>User ID</th><th>Password</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < result.length; i++) {
        template += `
    <tr>
        <td>${result[i]['userid']}</td>
        <td>${result[i]['passwd']}</td>
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

    // User TBL login 로그인
    app.post('/login', (req, res) => {
        const { id, pw } = req.body;
        const result = connection.query("select * from usertbl where userId=? and passwd=?", [id, pw]);
        // console.log(result);
        if (result.length == 0) {
            res.redirect('error.html')
        }
        if (id == 'admin' || id == 'root') {
            console.log(id + " => Administrator Logined")
            res.redirect('member.html?id=' + id);
        } else {
            console.log(id + " => User Logined")
            res.redirect('user.html?id=' + id)
        }
    })
}

// User TBL register 회원가입
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
            res.redirect('/');
        }
    }
})

// main button(각 동별 연결)
app.get('/selectDong', (req, res) => {
    console.log(req.query.shopArea);
    const shopArea = req.query.shopArea;
    if (shopArea == "") {
        //res.send('원하는 동을 입력하세요')
        res.write("<script>alert('동을 입력해야 합니다.')</script>");
    } else {
        const result = connection.query("SELECT * FROM shoptbl where shopArea=?", [shopArea]);
        console.log(result);
        // res.send(result);
        if (result.length == 0) {
            //template_nodata(res)
            res.write("<script>alert('동을 잘못 입력했습니다. 다시 입력해주세요.')</script>");
        } else {
            template_result(result, res);
        }
    }
})


module.exports = app;