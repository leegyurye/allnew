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

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define schema
var restblSchema = mongoose.Schema({
    resNumber: String,
    userId: String,
    shopId: Number,
    resDate: String,
    shopService: String
})

// create model with mongodb collection and schema
var Restbls = mongoose.model('restbls', restblSchema);

//MY SQL > MONGO Insert 위한 Select
function resselect_result(req) {
    const result = connection.query('SELECT * FROM restbl');
    return result;
}

//MY SQL insert function
function restblsql(req, res) {
    var { resNumber, userId, shopId, resDate, shopService } = req.body;
    let rescode = 0;
    const restblsql = connection.query("insert into restbl values (?, ?, ?, ?, ?)", [resNumber, userId, shopId, resDate, shopService]);
    return rescode = 1;
}

//Mongoose insert function
function restblmongo(req, res) {
    var { resNumber, userId, shopId, resDate, shopService } = req.body;
    var restbls = new Restbls({ 'resNumber': resNumber, 'userId': userId, 'shopId': shopId, 'resDate': resDate, 'shopService': shopService })
    let rescode = 0;
    restbls.save(function (err, silence) {
        if (err) {
            console.log('err')
        }
        return rescode = 1;
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

function template_result2(shoptbl, res) {
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
    for (var i = 0; i < shoptbl.length; i++) {
        template += `
    <tr>
        <td>${shoptbl[i]['shopId']}</td>
        <td>${shoptbl[i]['shopService']}</td>
        <td>${shoptbl[i]['shopName']}</td>
        <td>${shoptbl[i]['shopArea']}</td>
        <td>${shoptbl[i]['shopAddr']}</td>
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
        <tr><th>resNumber</th><th>userId</th><th>shopId</th><th>resDate</th><th>shopService</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < restbl.length; i++) {
        template += `
    <tr>
        <td>${restbl[i]['resNumber']}</td>
        <td>${restbl[i]['userId']}</td>
        <td>${restbl[i]['shopId']}</td>
        <td>${restbl[i]['resDate']}</td>
        <td>${restbl[i]['shopService']}</td>
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

function template_result4(usertbl, res) {
    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>usertbl</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="mystyle.css" />
    </head>
    <body>
    <table border="1" style="margin:auto;">
    <thead>
        <tr><th>userId</th><th>passwd</th><th>userName</th><th>userAddr</th><th>userNumber</th></tr>
    </thead>
    <tbody>
    `;
    for (var i = 0; i < usertbl.length; i++) {
        template += `
    <tr>
        <td>${usertbl[i]['userId']}</td>
        <td>${usertbl[i]['passwd']}</td>
        <td>${usertbl[i]['userName']}</td>
        <td>${usertbl[i]['userAddr']}</td>
        <td>${usertbl[i]['userNumber']}</td>
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

//MY SQL delete function
function deletesql(req, res) {
    const resNumber = req.body.resNumber;
    let rescode = 0;
    if (resNumber == "") {
        res.write("<script>alert('휴대전화번호를 입력하세요.')</script>");
    } else {
        const deletesql = connection.query("select * from restbl where resNumber=?", [resNumber]);
        if (deletesql.length == 0) {
            template_nodata(res);
        } else {
            const deletesql = connection.query("delete from restbl where resNumber=?", [resNumber]);
            return rescode = 1;
        }
    }
}

//Mongoose delete function
function deletemongo(req) {
    var resNumber = req.body.resNumber;
    let rescode = 0;

    var restbls = Restbls.find({ 'resNumber': resNumber })
    restbls.deleteOne(function (err) {
        if (err)
            console.log('err')
    })
    return rescode = 1;
}



// 로그인
app.post('/login', (req, res) => {
    const { id, pw } = req.body;
    const usertbl = connection.query("select * from usertbl where userid=? and passwd=?", [id, pw]);
    // console.log(usertbl);
    if (usertbl.length == 0) {
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
app.post('/register', (req, res) => {
    const { id, pw, name, addr, num } = req.body;
    if (id == "") {
        res.redirect('register.html')
    } else {
        let usertbl = connection.query("select * from usertbl where userid=? ", [id]);
        if (usertbl.length > 0) {
            //res.writeHead(200);
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
            usertbl = connection.query("insert into usertbl values (?, ?, ?, ?, ?)", [id, pw, name, addr, num]);
            console.log(usertbl);
            // res.send({ "ok": true, "usertbl": [{ "id": id, "pw": pw, "name": name, "addr": addr, "num": num }], "service": "register" });
            res.redirect('/');
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
        const shoptbl = connection.query("SELECT * FROM shoptbl where shopArea=?", [shopArea]);
        console.log(shoptbl.length);
        // res.send(shoptbl);
        if (shoptbl.length == 0) {
            template_nodata(res);
            // res.send({ "ok": false, "shoptbl": shoptbl, "service": "SelectDong" });
        } else {
            template_result2(shoptbl, res);
            // res.send({ "ok": true, "shopArea": shoptbl, "service": "SelectDong" });
        }
    }
})






// 전체 업체 검색
app.get('/select', (req, res) => {
    const shoptbl = connection.query('SELECT * FROM shoptbl');
    console.log(shoptbl);
    //res.send('{"ok":true, "affectedRows":' + shoptbl.affectedRows + ', "service":"insert"}');
    // res.send(shoptbl);
    if (shoptbl.length == 0) {
        template_nodata(res);
        // res.send({ "ok": false, "shoptbl": shoptbl, "service": "select" });
    } else {
        template_result2(shoptbl, res);
        // res.send({ "ok": true, "shoptbl": shoptbl, "service": "select" });
    }

})

// 예약 등록 
app.post('/insert', (req, res) => {
    const { resNumber, userId, shopId, resDate, shopService } = req.body;
    if (resNumber == "" || userId == "" || shopId == "" || resDate == "" || shopService == "") {
        // res.send('정보를 빠짐없이 입력하세요.')
        res.write("<script>alert('정보를 빠짐없이 입력하세요.')</script>");
    } else {
        let restbl = connection.query("select * from restbl where resNumber=?", [resNumber]);
        if (restbl.length > 0) {
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
            restblmongo(req, res)
            console.log(restbl);
            res.status(200).send("예약이 완료되었습니다.");

            // res.redirect('/selectDong?resNumber=' + req.body);
            // res.send({ "ok": true, "restbl": [{ "resNumber": resNumber, "userID": userId, "shopId": shopId, "resDate": resDate, "shopService": shopService }], "service": "Reservation" });
        }
    }
})


// 전체 예약 select
app.get('/resselect', (req, res) => {
    const restbl = connection.query('SELECT * FROM restbl');
    console.log(restbl);
    // res.send(restbl;
    if (restbl.length == 0) {
        template_nodata(res);
        // res.send({ "ok": true, "restbl": restbl, "service": "ReservationSelect" });
    } else {
        template_result3(restbl, res);
        // res.send({ "ok": true, "restbl": restbl, "service": "ReservationSelect" });
    }
})


// 전체 고객 select
app.get('/userselect', (req, res) => {
    const usertbl = connection.query('SELECT * FROM usertbl');
    console.log(usertbl);
    // res.send(usertbl;
    if (usertbl.length == 0) {
        template_nodata(res);
        // res.send({ "ok": true, "usertbl": usertbl, "service": "UserSelect" });
    } else {
        template_result4(usertbl, res);
        // res.send({ "ok": true, "usertbl": usertbl, "service": "UserSelect" });
    }
})

// mongo insert
app.post('/mongoinsert', function (req, res) {
    let result = resselect_result(req)
    //상위에 지정한 My SQL > Mongo로 이동하는 Function 이므로 result로 변수 선언
    let flag = 0

    for (var i = 0; i < result.length; i++) {
        var resNumber = result[i].resNumber;
        var userId = result[i].userId;
        var shopId = result[i].shopId;
        var resDate = result[i].resDate;
        var shopService = result[i].shopService;

        var restbls = new Restbls({ 'resNumber': resNumber, 'userId': userId, 'shopId': shopId, 'resDate': resDate, 'shopService': shopService })

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
app.get('/mongoget', function (req, res) {
    var resNumber = req.query.resNumber
    Restbls.findOne({ 'resNumber': resNumber }, { _id: 0 }, function (err, mongoget) {
        if (err) console.log(err)
        res.send({ "고객님의 예약은 :": mongoget })
        // res.send({ "ok": true, "mongoget": [mongoget], "service": "mongoget" })
    })
})

// update
app.post('/mongoupdate', function (req, res, next) {
    var resNumber = req.body.resNumber;
    var userId = req.body.userId;
    var shopId = req.body.shopId;
    var resDate = req.body.resDate;
    var shopService = req.body.shopService;

    Restbls.findOne({ 'resNumber': resNumber }, function (err, restbl) {
        if (err) {
            console.log('err')
            // res.status(500).send('update error')
            res.status(500).send({ "ok": false, "rstbl": [restbl], "service": "mongoupdate" })
            return;
        }
        restbl.userId = userId;
        restbl.shopId = shopId;
        restbl.resDate = resDate;
        restbl.shopService = shopService;


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
app.post('/mongodelete', function (req, res) {
    let rescode_mongo = deletemongo(req)
    let rescode_mysql = deletesql(req, res)
    console.log({ "mongo_delete ": rescode_mongo, "mysql_delete": rescode_mysql })
    res.status(200).send({ "mongo_delete ": rescode_mongo, "mysql_delete": rescode_mysql });
    // res.status(200).send("예약이 취소되었습니다.");

})

module.exports = app;