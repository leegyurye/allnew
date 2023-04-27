const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const mongoose = require("mongoose");
const pool = require("../config/pool")

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//MY SQL > MONGO Insert 위한 Select
async function resselect_result(req) {
    const [rows, fields] = await pool.query('SELECT * FROM restbl');
    return rows;
}

//MY SQL insert function
async function restblsql(req) {
    var { resNumber, userId, shopName, resDate, shopService, shopArea } = req.body;
    const [rows, fields] = await pool.query("insert into restbl values (?, ?, ?, ?, ?, ?)", [resNumber, userId, shopName, resDate, shopService, shopArea]);
    console.log("1 : " + resNumber)
    return rows;
}

//Mongoose insert function
function restblmongo(req) {
    var { resNumber, userId, shopName, resDate, shopService, shopArea } = req.body;
    var restbls = new Restbls({ 'resNumber': resNumber, 'userId': userId, 'shopName': shopName, 'resDate': resDate, 'shopService': shopService, 'shopArea': shopArea })

    restbls.save(function (err, silence) {
        if (err) {
            console.log('err')
            res.status(500).send('insert error')
            return;
        }
        console.log("2")
        res.status(200).send("Inserted")
    })

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

function template_result2(rows, res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>shoptbl</title>
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
    for (var i = 0; i < rows.length; i++) {
        template += `
    <tr>
        <td>${rows[i]['shopId']}</td>
        <td>${rows[i]['shopService']}</td>
        <td>${rows[i]['shopName']}</td>
        <td>${rows[i]['shopArea']}</td>
        <td>${rows[i]['shopAddr']}</td>
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

function template_result3(restbl, res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>restbl</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="mystyle.css" />
    </head>
    <body>
    <table border="1" style="margin:auto;">
    <thead>
        <tr><th>resNumber</th><th>userId</th><th>shopName</th><th>resDate</th><th>shopService</th><th>shopArea</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < restbl.length; i++) {
        template += `
    <tr>
        <td>${restbl[i]['resNumber']}</td>
        <td>${restbl[i]['userId']}</td>
        <td>${restbl[i]['shopName']}</td>
        <td>${restbl[i]['resDate']}</td>
        <td>${restbl[i]['shopService']}</td>
        <td>${restbl[i]['shopArea']}</td>
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


// 로그인
app.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    const [rows, fields] = await pool.query("select * from usertbl where userid=? and passwd=?", [id, pw]);
    // console.log(usertbl);
    if (rows.length == 0) {
        res.redirect('error.html')
    }
    if (id == 'admin' || id == 'root') {
        console.log(id + " => Administrator Logined")
        res.redirect('member.html?id=' + id)
        // res.send({ "ok": true, "userid": [id], "service": "Admin login" });
    } else {
        console.log(id + " => User Logined")
        res.redirect('main.html?id=' + id)
        // res.send({ "ok": true, "userid": [id], "service": "User login" });
    }
})

// 회원가입 
app.post('/register', async (req, res) => {
    const { id, pw, name, addr, num } = req.body;
    if (id == "") {
        res.redirect('register.html')
    } else {
        let [rows, fields] = await pool.query("select * from usertbl where userid=? and passwd=? and userName=? and userAddr=? and userNumber=?", [id, pw, name, addr, num]);
        if (rows.length > 0) {
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
            rows = await pool.query("insert into usertbl values (?, ?, ?, ?, ?)", [id, pw, name, addr, num]);
            console.log(rows);
            // res.send({ "ok": true, "usertbl": [{ "id": id, "pw": pw, "name": name, "addr": addr, "num": num }], "service": "register" });
            res.redirect('/');
        }
    }
})


//SelectDong ' 동 (Area) ' 에 따른 Shop 조회
app.get('/selectDong', async (req, res) => {
    const shopArea = req.query.shopArea;
    if (shopArea == "") {
        // res.send('원하는 동을 입력하세요.')
        res.write("<script>alert('원하는 동을 입력하세요')</script>");
    } else {
        const [rows, fields] = await pool.query("SELECT * FROM shoptbl where shopArea=?", [shopArea]);
        console.log(rows.length);
        // res.send(shoptbl);
        if (rows.length == 0) {
            template_nodata(res);
            // res.send({ "ok": false, "shoptbl": shoptbl, "service": "SelectDong" });
        } else {
            template_result2(rows, res);
            // res.send({ "ok": true, "shopArea": shoptbl, "service": "SelectDong" });
        }
    }
})

// 전체 업체 검색
app.get('/select', async (req, res) => {
    const [rows, fields] = await pool.query('SELECT * FROM shoptbl');
    console.log(rows);
    //res.send('{"ok":true, "affectedRows":' + shoptbl.affectedRows + ', "service":"insert"}');
    // res.send(shoptbl);
    if (rows.length == 0) {
        template_nodata(res);
        // res.send({ "ok": false, "shoptbl": shoptbl, "service": "select" });
    } else {
        template_result2(rows, res);
        // res.send({ "ok": true, "shoptbl": shoptbl, "service": "select" });
    }

})

// 예약 등록 
app.post('/insert', async (req, res) => {
    const { resNumber, userId, shopName, resDate, shopService, shopArea } = req.body;
    if (resNumber == "" || userId == "" || shopName == "" || resDate == "" || shopService == "" || shopArea == "") {
        // res.send('정보를 빠짐없이 입력하세요.')
        res.write("<script>alert('정보를 빠짐없이 입력하세요.')</script>");
    } else {
        let [rows, fields] = await pool.query("select * from restbl where resNumber=?", [resNumber]);
        if (rows.length > 0) {
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
                <h4 style="margin-left: 30px">이미 예약이 완료되었습니다.</h4>
            </div>
        </body>
        </html>
        `;
            res.end(template);
        } else {
            restblsql(req)
            restblmongo(req)
            console.log(rows);
            res.send("예약이 완료되었습니다.");

            // res.redirect('/selectDong?resNumber=' + req.body);
            // res.send({ "ok": true, "restbl": [{ "resNumber": resNumber, "userID": userId, "shopName": shopName, "resDate": resDate, "shopService": shopService, "shopArea": shopArea }], "service": "Reservation" });
        }
    }
})


// request O, query X
app.get('/select2', async (req, res) => {
    const [rows, fields] = await pool.query('SELECT * FROM restbl');
    console.log(rows);
    // res.send(restbl;
    if (rows.length == 0) {
        // template_nodata(res);
        res.send({ "ok": true, "restbl": rows, "service": "ReservationSelect" });
    } else {
        // template_result3(result, res);
        res.send({ "ok": true, "restbl": rows, "service": "ReservationSelect" });
    }
})

// mongo insert
app.post('/mongoinsert', async function (req, res) {
    let result = resselect_result(req)
    //상위에 지정한 My SQL > Mongo로 이동하는 Function 이므로 result로 변수 선언
    let flag = 0

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
                flag = 1;
                return;
            }
        })
        if (flag) break;
    }
    if (flag) {
        console.log('err')
        // res.status(500).send('insert error')
        res.send({ "ok": false, "mongoinsert": [restbls], "service": "mongoinsert" });
    } else {
        // res.status(200).send("Inserted")
        res.send({ "ok": true, "mongoinsert": [restbls], "service": "mongoinsert" });
    }

})

// list
app.get('/mongolist', function (req, res, next) {
    Restbls.find({}, { _id: 0 }, function (err, mongolist) {
        if (err) console.log('err')
        res.send(mongolist)

    })
})


// get
app.get('/mongoget', function (req, res, next) {
    var resnumber = req.query.resNumber
    Restbls.findOne({ 'resNumber': resnumber }, { _id: 0 }, function (err, mongoget) {
        if (err) console.log(err)
        res.send({ "고객님의 예약은 :": mongoget })
    })
})

// update
app.post('/mongoupdate', function (req, res, next) {
    var resNumber = req.body.resNumber;
    var userId = req.body.userId;
    var shopName = req.body.shopName;
    var resDate = req.body.resDate;
    var shopService = req.body.shopService;
    var shopArea = req.body.shopArea;

    Restbls.findOne({ 'resNumber': resNumber }, function (err, restbl) {
        if (err) {
            console.log('err')
            // res.status(500).send('update error')
            res.status(500).send({ "ok": false, "rstbl": [restbl], "service": "mongoupdate" })
            return;
        }
        restbl.userId = userId;
        restbl.shopName = shopName;
        restbl.resDate = resDate;
        restbl.shopService = shopService;
        restbl.shopArea = shopArea;

        restbl.save(function (err, silence) {
            if (err) {
                console.log('err')
                res.status(500).send({ "ok": false, "rstbl": [restbl], "service": "mongoupdate" })
                return;
            }
            // res.status(200).send("Updated")
            res.status(200).send({ "ok": true, "rstbl": [restbl], "service": "mongoupdate" })

        })
    })
})

// delete
app.post('/mongodelete', function (req, res, next) {
    var resNumber = req.body.resNumber;

    var restbls = Restbls.find({ 'resNumber': resNumber })
    restbls.remove(function (err) {
        if (err) {
            console.log('err')
            res.status(500).send({ "ok": false, "service": "mongodelete" })
            return;
        }
        // res.status(200).send("Removed")
        res.status(200).send({ "ok": true, "service": "mongodelete" })
    })
})

module.exports = app;