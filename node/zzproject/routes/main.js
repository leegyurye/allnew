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

// login
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

// register
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


// request O, query O
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

// request O, query X
app.get('/select', (req, res) => {
    const result = connection.query('SELECT * FROM shoptbl');
    console.log(result);
    // res.send(result);
    if (result.length == 0) {
        template_nodata(res);
    } else {
        template_result2(result, res);
    }
})

// request O, query O
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

module.exports = app;