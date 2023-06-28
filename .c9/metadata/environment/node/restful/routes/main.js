{"filter":false,"title":"main.js","tooltip":"/node/restful/routes/main.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":82,"column":30},"end":{"row":82,"column":31},"action":"insert","lines":["d"],"id":326},{"start":{"row":82,"column":31},"end":{"row":82,"column":32},"action":"insert","lines":["y"]}],[{"start":{"row":80,"column":0},"end":{"row":91,"column":2},"action":"remove","lines":["// put, request body O, response O","app.delete('/api/users/delete', (req, res) => {","    const { user_id } = req.body","    const user = users.map(data => {","        if (data.id == user_id) data.name = name","        return {","            id : data.id,","            name: data.name","        }","    })","    res.json({ok:true, users: user});","})"],"id":327},{"start":{"row":80,"column":0},"end":{"row":85,"column":2},"action":"insert","lines":["// post, request body O, response O","app.post('/api/users/userbody', (req, res) => {","    const user_id = req.body.id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users: user});","})"]}],[{"start":{"row":81,"column":7},"end":{"row":81,"column":8},"action":"remove","lines":["t"],"id":328},{"start":{"row":81,"column":6},"end":{"row":81,"column":7},"action":"remove","lines":["s"]},{"start":{"row":81,"column":5},"end":{"row":81,"column":6},"action":"remove","lines":["o"]},{"start":{"row":81,"column":4},"end":{"row":81,"column":5},"action":"remove","lines":["p"]}],[{"start":{"row":81,"column":4},"end":{"row":81,"column":5},"action":"insert","lines":["d"],"id":329},{"start":{"row":81,"column":5},"end":{"row":81,"column":6},"action":"insert","lines":["e"]},{"start":{"row":81,"column":6},"end":{"row":81,"column":7},"action":"insert","lines":["l"]},{"start":{"row":81,"column":7},"end":{"row":81,"column":8},"action":"insert","lines":["e"]},{"start":{"row":81,"column":8},"end":{"row":81,"column":9},"action":"insert","lines":["t"]},{"start":{"row":81,"column":9},"end":{"row":81,"column":10},"action":"insert","lines":["e"]}],[{"start":{"row":81,"column":30},"end":{"row":81,"column":31},"action":"remove","lines":["y"],"id":330},{"start":{"row":81,"column":29},"end":{"row":81,"column":30},"action":"remove","lines":["d"]},{"start":{"row":81,"column":28},"end":{"row":81,"column":29},"action":"remove","lines":["o"]},{"start":{"row":81,"column":27},"end":{"row":81,"column":28},"action":"remove","lines":["b"]},{"start":{"row":81,"column":26},"end":{"row":81,"column":27},"action":"remove","lines":["r"]},{"start":{"row":81,"column":25},"end":{"row":81,"column":26},"action":"remove","lines":["e"]},{"start":{"row":81,"column":24},"end":{"row":81,"column":25},"action":"remove","lines":["s"]},{"start":{"row":81,"column":23},"end":{"row":81,"column":24},"action":"remove","lines":["u"]}],[{"start":{"row":81,"column":23},"end":{"row":81,"column":24},"action":"insert","lines":["d"],"id":331},{"start":{"row":81,"column":24},"end":{"row":81,"column":25},"action":"insert","lines":["e"]},{"start":{"row":81,"column":25},"end":{"row":81,"column":26},"action":"insert","lines":["l"]},{"start":{"row":81,"column":26},"end":{"row":81,"column":27},"action":"insert","lines":["e"]},{"start":{"row":81,"column":27},"end":{"row":81,"column":28},"action":"insert","lines":["t"]},{"start":{"row":81,"column":28},"end":{"row":81,"column":29},"action":"insert","lines":["e"]}],[{"start":{"row":82,"column":30},"end":{"row":82,"column":31},"action":"remove","lines":["d"],"id":332},{"start":{"row":82,"column":29},"end":{"row":82,"column":30},"action":"remove","lines":["i"]},{"start":{"row":82,"column":28},"end":{"row":82,"column":29},"action":"remove","lines":["."]}],[{"start":{"row":82,"column":10},"end":{"row":82,"column":11},"action":"insert","lines":["{"],"id":333}],[{"start":{"row":82,"column":11},"end":{"row":82,"column":12},"action":"insert","lines":[" "],"id":334}],[{"start":{"row":82,"column":19},"end":{"row":82,"column":20},"action":"insert","lines":[" "],"id":335},{"start":{"row":82,"column":20},"end":{"row":82,"column":21},"action":"insert","lines":["}"]}],[{"start":{"row":83,"column":46},"end":{"row":83,"column":47},"action":"remove","lines":["="],"id":336}],[{"start":{"row":83,"column":46},"end":{"row":83,"column":47},"action":"insert","lines":["!"],"id":337}],[{"start":{"row":0,"column":0},"end":{"row":87,"column":21},"action":"remove","lines":["const express = require('express');","const bodyParser = require('body-parser');","","const app = express()","","app.use(bodyParser.json());","app.use(bodyParser.urlencoded({ extended: false }));","app.use(express.json());","app.use(express.urlencoded({ extended: true }));","","const users = [","        {id:1, name:\"User1\"},","        {id:2, name:\"User2\"},","        {id:3, name:\"User3\"}","];","","app.get('/hello', (req, res) => {","    res.send('Hello World~!!\\n')","})","","// request X, response O","app.get('/api/users', (req, res) => {","    res.json({ok:true, users:users});","})","","// Query param, request O, response O","app.get('/api/users/user', (req, res) => {","    const user_id = req.query.user_id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users: user});","})","","// Path param, request O, response O","app.get('/api/users/useridname', (req, res) => {","    const { user_id, name } = req.query","    const user = users.filter(data => data.id == user_id && data.name == name)","    res.json({ok:false, users: user});","})","","// post, request body O, response O","app.post('/api/users/userbody', (req, res) => {","    const user_id = req.body.id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users: user});","})","","// post, request body O, response O","app.post('/api/users/add', (req, res) => {","    const { id, name } = req.body","    const user = users.concat({ id, name })","    res.json({ok:true, users: user});","})","","// put, request body O, response O","app.put('/api/users/update', (req, res) => {","    const { id, name } = req.body","    const user = users.map(data => {","        if (data.id == id) data.name = name","        return {","            id : data.id,","            name: data.name","        }","    })","    res.json({ok:true, users: user});","})","","// put, request body O, response O","app.patch('/api/users/update/:user_id', (req, res) => {","    const { user_id } = req.params","    const { name } = req.body","    const user = users.map(data => {","        if (data.id == user_id) data.name = name","        return {","            id : data.id,","            name: data.name","        }","    })","    res.json({ok:true, users: user});","})","","// post, request body O, response O","app.delete('/api/users/delete', (req, res) => {","    const { user_id } = req.body","    const user = users.filter(data => data.id != user_id)","    res.json({ok:false, users: user});","})","","module.exports = app;"],"id":338},{"start":{"row":0,"column":0},"end":{"row":90,"column":0},"action":"insert","lines":["const express = require('express');","const bodyParser = require('body-parser');","","const app = express()","","app.use(bodyParser.json());","app.use(bodyParser.urlencoded({ extended: false }));","app.use(express.json());","app.use(express.urlencoded({ extended: true }));","","const users = [","        {id:1, name:\"User1\"},","        {id:2, name:\"User2\"},","        {id:3, name:\"User3\"}","]","","","app.get('/hello', (req, res) => {","    res.send(\"Hello World~!!\\n\");","})","","","// request X , response O","app.get(\"/api/users\", (req, res) => {","    res.json({ok:true, users:users});","})","","// Query param, request O, response O","app.get(\"/api/users/user\", (req, res) => {","    const user_id = req.query.user_id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users:user});","})","","// Query param, request O, response O","app.get(\"/api/users/useridname\", (req, res) => {","    const { user_id, name }= req.query","    const user = users.filter(data => data.id == user_id && data.name == name)","    res.json({ok:false, users:user});","})","","// Path param, request O, response O","app.get(\"/api/users/:user_id\", (req, res) => {","    const user_id = req.params.user_id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users:user});","})","","// post, request body O, response O","app.post(\"/api/users/userBody\", (req, res) => {","    const user_id = req.body.id","    const user = users.filter(data => data.id == user_id)","    res.json({ok:false, users:user});","})","","// put, request body O, response O","app.put(“/api/users/update\", (req, res) => {","    const { id, name } = req.body","    const user = users.map(data => {","        if (data.id == id) data.name = name","        return {","            id : data.id,","            name : data.name","        }","    })","    res.json({ok:true, users:user});","})","","// patch, request params & body O, response O","app.patch(\"/api/users/update/:user_id\", (req, res) => {","    const { user_id } = req.params","    const { name } = req.body","    const user = users.map(data => {","        if (data.id == user_id) data.name = name","        return {","            id : data.id,","            name : data.name","        }","    })","    res.json({ok:true, users:user});","})","","// delete, request body O, response O","app.delete(\"/api/users/delete\", (req, res) => {","    const { user_id } = req.body","    const user = users.filter(data => data.id != user_id)","    res.json({ok:false, users:user});","})","","module.exports = app;",""]}],[{"start":{"row":56,"column":8},"end":{"row":56,"column":9},"action":"remove","lines":["“"],"id":339}],[{"start":{"row":56,"column":8},"end":{"row":56,"column":9},"action":"insert","lines":["\""],"id":340}],[{"start":{"row":18,"column":29},"end":{"row":18,"column":30},"action":"remove","lines":["n"],"id":341},{"start":{"row":18,"column":28},"end":{"row":18,"column":29},"action":"remove","lines":["\\"]}],[{"start":{"row":34,"column":0},"end":{"row":39,"column":2},"action":"remove","lines":["// Query param, request O, response O","app.get(\"/api/users/useridname\", (req, res) => {","    const { user_id, name }= req.query","    const user = users.filter(data => data.id == user_id && data.name == name)","    res.json({ok:false, users:user});","})"],"id":342},{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"remove","lines":["",""]},{"start":{"row":32,"column":2},"end":{"row":33,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":20,"column":0},"end":{"row":21,"column":0},"action":"remove","lines":["",""],"id":343}],[{"start":{"row":29,"column":4},"end":{"row":29,"column":57},"action":"remove","lines":["const user = users.filter(data => data.id == user_id)"],"id":344},{"start":{"row":29,"column":4},"end":{"row":29,"column":5},"action":"insert","lines":["i"]},{"start":{"row":29,"column":5},"end":{"row":29,"column":6},"action":"insert","lines":["f"]}],[{"start":{"row":29,"column":6},"end":{"row":29,"column":7},"action":"insert","lines":[" "],"id":345}],[{"start":{"row":29,"column":7},"end":{"row":29,"column":9},"action":"insert","lines":["()"],"id":346}],[{"start":{"row":29,"column":8},"end":{"row":29,"column":9},"action":"insert","lines":["r"],"id":347},{"start":{"row":29,"column":9},"end":{"row":29,"column":10},"action":"insert","lines":["e"]},{"start":{"row":29,"column":10},"end":{"row":29,"column":11},"action":"insert","lines":["p"]},{"start":{"row":29,"column":11},"end":{"row":29,"column":12},"action":"insert","lines":["."]}],[{"start":{"row":29,"column":12},"end":{"row":29,"column":13},"action":"insert","lines":["q"],"id":348},{"start":{"row":29,"column":13},"end":{"row":29,"column":14},"action":"insert","lines":["u"]},{"start":{"row":29,"column":14},"end":{"row":29,"column":15},"action":"insert","lines":["e"]},{"start":{"row":29,"column":15},"end":{"row":29,"column":16},"action":"insert","lines":["r"]},{"start":{"row":29,"column":16},"end":{"row":29,"column":17},"action":"insert","lines":["y"]},{"start":{"row":29,"column":17},"end":{"row":29,"column":18},"action":"insert","lines":["."]}],[{"start":{"row":29,"column":18},"end":{"row":29,"column":19},"action":"insert","lines":["n"],"id":349},{"start":{"row":29,"column":19},"end":{"row":29,"column":20},"action":"insert","lines":["a"]},{"start":{"row":29,"column":20},"end":{"row":29,"column":21},"action":"insert","lines":["m"]},{"start":{"row":29,"column":21},"end":{"row":29,"column":22},"action":"insert","lines":["e"]}],[{"start":{"row":29,"column":22},"end":{"row":29,"column":23},"action":"insert","lines":[" "],"id":350},{"start":{"row":29,"column":23},"end":{"row":29,"column":24},"action":"insert","lines":["="]},{"start":{"row":29,"column":24},"end":{"row":29,"column":25},"action":"insert","lines":["="]}],[{"start":{"row":29,"column":25},"end":{"row":29,"column":26},"action":"insert","lines":[" "],"id":351},{"start":{"row":29,"column":26},"end":{"row":29,"column":27},"action":"insert","lines":["n"]},{"start":{"row":29,"column":27},"end":{"row":29,"column":28},"action":"insert","lines":["u"]},{"start":{"row":29,"column":28},"end":{"row":29,"column":29},"action":"insert","lines":["l"]},{"start":{"row":29,"column":29},"end":{"row":29,"column":30},"action":"insert","lines":["l"]}],[{"start":{"row":29,"column":31},"end":{"row":29,"column":32},"action":"insert","lines":[" "],"id":352},{"start":{"row":29,"column":32},"end":{"row":29,"column":33},"action":"insert","lines":["{"]},{"start":{"row":29,"column":33},"end":{"row":29,"column":34},"action":"insert","lines":["}"]}],[{"start":{"row":29,"column":33},"end":{"row":31,"column":4},"action":"insert","lines":["","        ","    "],"id":353}],[{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"insert","lines":["l"],"id":354},{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"insert","lines":["e"]},{"start":{"row":30,"column":10},"end":{"row":30,"column":11},"action":"insert","lines":["t"]}],[{"start":{"row":30,"column":11},"end":{"row":30,"column":12},"action":"insert","lines":[" "],"id":355},{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"insert","lines":["u"]}],[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["s"],"id":356},{"start":{"row":30,"column":14},"end":{"row":30,"column":15},"action":"insert","lines":["e"]},{"start":{"row":30,"column":15},"end":{"row":30,"column":16},"action":"insert","lines":["r"]}],[{"start":{"row":30,"column":16},"end":{"row":30,"column":17},"action":"insert","lines":[" "],"id":357},{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"insert","lines":["-"]}],[{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"insert","lines":[" "],"id":358}],[{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"remove","lines":[" "],"id":359},{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"remove","lines":["-"]}],[{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"insert","lines":["="],"id":360}],[{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"insert","lines":[" "],"id":361},{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"insert","lines":["s"]},{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"insert","lines":["u"]},{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"insert","lines":["e"]},{"start":{"row":30,"column":22},"end":{"row":30,"column":23},"action":"insert","lines":["r"]},{"start":{"row":30,"column":23},"end":{"row":30,"column":24},"action":"insert","lines":["s"]}],[{"start":{"row":30,"column":23},"end":{"row":30,"column":24},"action":"remove","lines":["s"],"id":362},{"start":{"row":30,"column":22},"end":{"row":30,"column":23},"action":"remove","lines":["r"]},{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"remove","lines":["e"]},{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"remove","lines":["u"]},{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"remove","lines":["s"]}],[{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"insert","lines":["u"],"id":363},{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"insert","lines":["s"]},{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"insert","lines":["e"]},{"start":{"row":30,"column":22},"end":{"row":30,"column":23},"action":"insert","lines":["r"]},{"start":{"row":30,"column":23},"end":{"row":30,"column":24},"action":"insert","lines":["s"]}],[{"start":{"row":30,"column":24},"end":{"row":30,"column":25},"action":"insert","lines":["."],"id":364},{"start":{"row":30,"column":25},"end":{"row":30,"column":26},"action":"insert","lines":["f"]},{"start":{"row":30,"column":26},"end":{"row":30,"column":27},"action":"insert","lines":["i"]},{"start":{"row":30,"column":27},"end":{"row":30,"column":28},"action":"insert","lines":["l"]},{"start":{"row":30,"column":28},"end":{"row":30,"column":29},"action":"insert","lines":["t"]},{"start":{"row":30,"column":29},"end":{"row":30,"column":30},"action":"insert","lines":["e"]},{"start":{"row":30,"column":30},"end":{"row":30,"column":31},"action":"insert","lines":["r"]}],[{"start":{"row":30,"column":31},"end":{"row":30,"column":33},"action":"insert","lines":["()"],"id":365}],[{"start":{"row":28,"column":36},"end":{"row":28,"column":37},"action":"remove","lines":["d"],"id":366},{"start":{"row":28,"column":35},"end":{"row":28,"column":36},"action":"remove","lines":["i"]},{"start":{"row":28,"column":34},"end":{"row":28,"column":35},"action":"remove","lines":["_"]},{"start":{"row":28,"column":33},"end":{"row":28,"column":34},"action":"remove","lines":["r"]},{"start":{"row":28,"column":32},"end":{"row":28,"column":33},"action":"remove","lines":["e"]},{"start":{"row":28,"column":31},"end":{"row":28,"column":32},"action":"remove","lines":["s"]},{"start":{"row":28,"column":30},"end":{"row":28,"column":31},"action":"remove","lines":["u"]},{"start":{"row":28,"column":29},"end":{"row":28,"column":30},"action":"remove","lines":["."]}],[{"start":{"row":28,"column":10},"end":{"row":28,"column":11},"action":"insert","lines":["{"],"id":367}],[{"start":{"row":28,"column":11},"end":{"row":28,"column":12},"action":"insert","lines":[" "],"id":368}],[{"start":{"row":28,"column":19},"end":{"row":28,"column":20},"action":"insert","lines":[" "],"id":369},{"start":{"row":28,"column":20},"end":{"row":28,"column":21},"action":"insert","lines":["}"]}],[{"start":{"row":28,"column":19},"end":{"row":28,"column":20},"action":"insert","lines":[","],"id":370}],[{"start":{"row":28,"column":20},"end":{"row":28,"column":21},"action":"insert","lines":[" "],"id":371},{"start":{"row":28,"column":21},"end":{"row":28,"column":22},"action":"insert","lines":["n"]},{"start":{"row":28,"column":22},"end":{"row":28,"column":23},"action":"insert","lines":["a"]},{"start":{"row":28,"column":23},"end":{"row":28,"column":24},"action":"insert","lines":["m"]},{"start":{"row":28,"column":24},"end":{"row":28,"column":25},"action":"insert","lines":["e"]}],[{"start":{"row":28,"column":4},"end":{"row":29,"column":0},"action":"insert","lines":["",""],"id":372},{"start":{"row":29,"column":0},"end":{"row":29,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":28,"column":4},"end":{"row":28,"column":5},"action":"insert","lines":["l"],"id":373},{"start":{"row":28,"column":5},"end":{"row":28,"column":6},"action":"insert","lines":["e"]},{"start":{"row":28,"column":6},"end":{"row":28,"column":7},"action":"insert","lines":["t"]}],[{"start":{"row":28,"column":7},"end":{"row":28,"column":8},"action":"insert","lines":[" "],"id":374},{"start":{"row":28,"column":8},"end":{"row":28,"column":9},"action":"insert","lines":["u"]},{"start":{"row":28,"column":9},"end":{"row":28,"column":10},"action":"insert","lines":["s"]},{"start":{"row":28,"column":10},"end":{"row":28,"column":11},"action":"insert","lines":["e"]},{"start":{"row":28,"column":11},"end":{"row":28,"column":12},"action":"insert","lines":["r"]}],[{"start":{"row":28,"column":12},"end":{"row":28,"column":13},"action":"insert","lines":[" "],"id":375},{"start":{"row":28,"column":13},"end":{"row":28,"column":14},"action":"insert","lines":["="]}],[{"start":{"row":28,"column":14},"end":{"row":28,"column":15},"action":"insert","lines":[" "],"id":376}],[{"start":{"row":28,"column":15},"end":{"row":28,"column":17},"action":"insert","lines":["\"\""],"id":377}],[{"start":{"row":28,"column":17},"end":{"row":28,"column":18},"action":"insert","lines":[";"],"id":378}],[{"start":{"row":31,"column":32},"end":{"row":31,"column":33},"action":"insert","lines":["d"],"id":379},{"start":{"row":31,"column":33},"end":{"row":31,"column":34},"action":"insert","lines":["a"]},{"start":{"row":31,"column":34},"end":{"row":31,"column":35},"action":"insert","lines":["t"]},{"start":{"row":31,"column":35},"end":{"row":31,"column":36},"action":"insert","lines":["a"]}],[{"start":{"row":31,"column":36},"end":{"row":31,"column":37},"action":"insert","lines":[" "],"id":380},{"start":{"row":31,"column":37},"end":{"row":31,"column":38},"action":"insert","lines":["="]},{"start":{"row":31,"column":38},"end":{"row":31,"column":39},"action":"insert","lines":[">"]}],[{"start":{"row":31,"column":39},"end":{"row":31,"column":40},"action":"insert","lines":[" "],"id":381}],[{"start":{"row":31,"column":40},"end":{"row":31,"column":41},"action":"insert","lines":["d"],"id":382},{"start":{"row":31,"column":41},"end":{"row":31,"column":42},"action":"insert","lines":["a"]},{"start":{"row":31,"column":42},"end":{"row":31,"column":43},"action":"insert","lines":["t"]},{"start":{"row":31,"column":43},"end":{"row":31,"column":44},"action":"insert","lines":["a"]},{"start":{"row":31,"column":44},"end":{"row":31,"column":45},"action":"insert","lines":["."]},{"start":{"row":31,"column":45},"end":{"row":31,"column":46},"action":"insert","lines":["i"]},{"start":{"row":31,"column":46},"end":{"row":31,"column":47},"action":"insert","lines":["d"]}],[{"start":{"row":31,"column":47},"end":{"row":31,"column":48},"action":"insert","lines":[" "],"id":383},{"start":{"row":31,"column":48},"end":{"row":31,"column":49},"action":"insert","lines":["="]},{"start":{"row":31,"column":49},"end":{"row":31,"column":50},"action":"insert","lines":["="]}],[{"start":{"row":31,"column":50},"end":{"row":31,"column":51},"action":"insert","lines":[" "],"id":384},{"start":{"row":31,"column":51},"end":{"row":31,"column":52},"action":"insert","lines":["u"]},{"start":{"row":31,"column":52},"end":{"row":31,"column":53},"action":"insert","lines":["e"]}],[{"start":{"row":31,"column":52},"end":{"row":31,"column":53},"action":"remove","lines":["e"],"id":385}],[{"start":{"row":31,"column":52},"end":{"row":31,"column":53},"action":"insert","lines":["s"],"id":386},{"start":{"row":31,"column":53},"end":{"row":31,"column":54},"action":"insert","lines":["e"]},{"start":{"row":31,"column":54},"end":{"row":31,"column":55},"action":"insert","lines":["r"]},{"start":{"row":31,"column":55},"end":{"row":31,"column":56},"action":"insert","lines":["_"]}],[{"start":{"row":31,"column":56},"end":{"row":31,"column":57},"action":"insert","lines":["i"],"id":387},{"start":{"row":31,"column":57},"end":{"row":31,"column":58},"action":"insert","lines":["d"]}],[{"start":{"row":31,"column":59},"end":{"row":32,"column":0},"action":"insert","lines":["",""],"id":388},{"start":{"row":32,"column":0},"end":{"row":32,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":31,"column":11},"end":{"row":31,"column":12},"action":"remove","lines":[" "],"id":389},{"start":{"row":31,"column":10},"end":{"row":31,"column":11},"action":"remove","lines":["t"]},{"start":{"row":31,"column":9},"end":{"row":31,"column":10},"action":"remove","lines":["e"]},{"start":{"row":31,"column":8},"end":{"row":31,"column":9},"action":"remove","lines":["l"]}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"remove","lines":["    "],"id":390},{"start":{"row":31,"column":55},"end":{"row":32,"column":4},"action":"remove","lines":["","    "]}],[{"start":{"row":32,"column":5},"end":{"row":32,"column":6},"action":"insert","lines":[" "],"id":391},{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"insert","lines":["e"]},{"start":{"row":32,"column":7},"end":{"row":32,"column":8},"action":"insert","lines":["l"]},{"start":{"row":32,"column":8},"end":{"row":32,"column":9},"action":"insert","lines":["s"]},{"start":{"row":32,"column":9},"end":{"row":32,"column":10},"action":"insert","lines":["e"]}],[{"start":{"row":32,"column":10},"end":{"row":32,"column":11},"action":"insert","lines":[" "],"id":392},{"start":{"row":32,"column":11},"end":{"row":32,"column":12},"action":"insert","lines":["{"]},{"start":{"row":32,"column":12},"end":{"row":32,"column":13},"action":"insert","lines":["}"]}],[{"start":{"row":32,"column":12},"end":{"row":34,"column":4},"action":"insert","lines":["","        ","    "],"id":393}],[{"start":{"row":33,"column":8},"end":{"row":33,"column":9},"action":"insert","lines":["u"],"id":394},{"start":{"row":33,"column":9},"end":{"row":33,"column":10},"action":"insert","lines":["s"]},{"start":{"row":33,"column":10},"end":{"row":33,"column":11},"action":"insert","lines":["e"]},{"start":{"row":33,"column":11},"end":{"row":33,"column":12},"action":"insert","lines":["r"]}],[{"start":{"row":33,"column":12},"end":{"row":33,"column":13},"action":"insert","lines":[" "],"id":395},{"start":{"row":33,"column":13},"end":{"row":33,"column":14},"action":"insert","lines":["="]}],[{"start":{"row":33,"column":14},"end":{"row":33,"column":15},"action":"insert","lines":[" "],"id":396},{"start":{"row":33,"column":15},"end":{"row":33,"column":16},"action":"insert","lines":["u"]},{"start":{"row":33,"column":16},"end":{"row":33,"column":17},"action":"insert","lines":["s"]},{"start":{"row":33,"column":17},"end":{"row":33,"column":18},"action":"insert","lines":["e"]}],[{"start":{"row":33,"column":18},"end":{"row":33,"column":19},"action":"insert","lines":["r"],"id":397},{"start":{"row":33,"column":19},"end":{"row":33,"column":20},"action":"insert","lines":["s"]},{"start":{"row":33,"column":20},"end":{"row":33,"column":21},"action":"insert","lines":["."]},{"start":{"row":33,"column":21},"end":{"row":33,"column":22},"action":"insert","lines":["f"]},{"start":{"row":33,"column":22},"end":{"row":33,"column":23},"action":"insert","lines":["i"]}],[{"start":{"row":33,"column":23},"end":{"row":33,"column":24},"action":"insert","lines":["l"],"id":398}],[{"start":{"row":33,"column":21},"end":{"row":33,"column":24},"action":"remove","lines":["fil"],"id":399},{"start":{"row":33,"column":21},"end":{"row":33,"column":29},"action":"insert","lines":["filter()"]}],[{"start":{"row":33,"column":28},"end":{"row":33,"column":29},"action":"insert","lines":["d"],"id":400},{"start":{"row":33,"column":29},"end":{"row":33,"column":30},"action":"insert","lines":["a"]},{"start":{"row":33,"column":30},"end":{"row":33,"column":31},"action":"insert","lines":["t"]},{"start":{"row":33,"column":31},"end":{"row":33,"column":32},"action":"insert","lines":["a"]}],[{"start":{"row":33,"column":32},"end":{"row":33,"column":33},"action":"insert","lines":[" "],"id":401},{"start":{"row":33,"column":33},"end":{"row":33,"column":34},"action":"insert","lines":["="]},{"start":{"row":33,"column":34},"end":{"row":33,"column":35},"action":"insert","lines":[">"]}],[{"start":{"row":33,"column":35},"end":{"row":33,"column":36},"action":"insert","lines":[" "],"id":402}],[{"start":{"row":30,"column":29},"end":{"row":30,"column":30},"action":"remove","lines":["l"],"id":403},{"start":{"row":30,"column":28},"end":{"row":30,"column":29},"action":"remove","lines":["l"]},{"start":{"row":30,"column":27},"end":{"row":30,"column":28},"action":"remove","lines":["u"]},{"start":{"row":30,"column":26},"end":{"row":30,"column":27},"action":"remove","lines":["n"]}],[{"start":{"row":30,"column":26},"end":{"row":30,"column":27},"action":"insert","lines":["u"],"id":404},{"start":{"row":30,"column":27},"end":{"row":30,"column":28},"action":"insert","lines":["n"]}],[{"start":{"row":30,"column":28},"end":{"row":30,"column":29},"action":"insert","lines":["d"],"id":405},{"start":{"row":30,"column":29},"end":{"row":30,"column":30},"action":"insert","lines":["e"]},{"start":{"row":30,"column":30},"end":{"row":30,"column":31},"action":"insert","lines":["f"]}],[{"start":{"row":30,"column":31},"end":{"row":30,"column":32},"action":"insert","lines":["i"],"id":406},{"start":{"row":30,"column":32},"end":{"row":30,"column":33},"action":"insert","lines":["n"]},{"start":{"row":30,"column":33},"end":{"row":30,"column":34},"action":"insert","lines":["e"]},{"start":{"row":30,"column":34},"end":{"row":30,"column":35},"action":"insert","lines":["d"]}],[{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"remove","lines":["."],"id":407},{"start":{"row":30,"column":16},"end":{"row":30,"column":17},"action":"remove","lines":["y"]},{"start":{"row":30,"column":15},"end":{"row":30,"column":16},"action":"remove","lines":["r"]},{"start":{"row":30,"column":14},"end":{"row":30,"column":15},"action":"remove","lines":["e"]},{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"remove","lines":["u"]},{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"remove","lines":["q"]},{"start":{"row":30,"column":11},"end":{"row":30,"column":12},"action":"remove","lines":["."]},{"start":{"row":30,"column":10},"end":{"row":30,"column":11},"action":"remove","lines":["p"]},{"start":{"row":30,"column":9},"end":{"row":30,"column":10},"action":"remove","lines":["e"]},{"start":{"row":30,"column":8},"end":{"row":30,"column":9},"action":"remove","lines":["r"]}],[{"start":{"row":33,"column":36},"end":{"row":33,"column":54},"action":"insert","lines":["data.id == user_id"],"id":408}],[{"start":{"row":33,"column":54},"end":{"row":33,"column":55},"action":"insert","lines":["&"],"id":409},{"start":{"row":33,"column":55},"end":{"row":33,"column":56},"action":"insert","lines":["&"]}],[{"start":{"row":33,"column":53},"end":{"row":33,"column":54},"action":"insert","lines":[" "],"id":410}],[{"start":{"row":33,"column":53},"end":{"row":33,"column":54},"action":"remove","lines":[" "],"id":411}],[{"start":{"row":33,"column":54},"end":{"row":33,"column":55},"action":"insert","lines":[" "],"id":412}],[{"start":{"row":33,"column":57},"end":{"row":33,"column":58},"action":"insert","lines":[" "],"id":413},{"start":{"row":33,"column":58},"end":{"row":33,"column":59},"action":"insert","lines":["d"]},{"start":{"row":33,"column":59},"end":{"row":33,"column":60},"action":"insert","lines":["a"]},{"start":{"row":33,"column":60},"end":{"row":33,"column":61},"action":"insert","lines":["t"]},{"start":{"row":33,"column":61},"end":{"row":33,"column":62},"action":"insert","lines":["a"]},{"start":{"row":33,"column":62},"end":{"row":33,"column":63},"action":"insert","lines":["."]}],[{"start":{"row":33,"column":63},"end":{"row":33,"column":64},"action":"insert","lines":["n"],"id":414},{"start":{"row":33,"column":64},"end":{"row":33,"column":65},"action":"insert","lines":["a"]},{"start":{"row":33,"column":65},"end":{"row":33,"column":66},"action":"insert","lines":["m"]},{"start":{"row":33,"column":66},"end":{"row":33,"column":67},"action":"insert","lines":["e"]}],[{"start":{"row":33,"column":67},"end":{"row":33,"column":68},"action":"insert","lines":[" "],"id":415},{"start":{"row":33,"column":68},"end":{"row":33,"column":69},"action":"insert","lines":["="]},{"start":{"row":33,"column":69},"end":{"row":33,"column":70},"action":"insert","lines":["="]},{"start":{"row":33,"column":70},"end":{"row":33,"column":71},"action":"insert","lines":["a"]},{"start":{"row":33,"column":71},"end":{"row":33,"column":72},"action":"insert","lines":["n"]}],[{"start":{"row":33,"column":71},"end":{"row":33,"column":72},"action":"remove","lines":["n"],"id":416},{"start":{"row":33,"column":70},"end":{"row":33,"column":71},"action":"remove","lines":["a"]}],[{"start":{"row":33,"column":70},"end":{"row":33,"column":71},"action":"insert","lines":[" "],"id":417},{"start":{"row":33,"column":71},"end":{"row":33,"column":72},"action":"insert","lines":["n"]},{"start":{"row":33,"column":72},"end":{"row":33,"column":73},"action":"insert","lines":["a"]},{"start":{"row":33,"column":73},"end":{"row":33,"column":74},"action":"insert","lines":["m"]},{"start":{"row":33,"column":74},"end":{"row":33,"column":75},"action":"insert","lines":["e"]}],[{"start":{"row":30,"column":24},"end":{"row":30,"column":25},"action":"remove","lines":["d"],"id":418},{"start":{"row":30,"column":23},"end":{"row":30,"column":24},"action":"remove","lines":["e"]},{"start":{"row":30,"column":22},"end":{"row":30,"column":23},"action":"remove","lines":["n"]},{"start":{"row":30,"column":21},"end":{"row":30,"column":22},"action":"remove","lines":["i"]},{"start":{"row":30,"column":20},"end":{"row":30,"column":21},"action":"remove","lines":["f"]},{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"remove","lines":["e"]},{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"remove","lines":["d"]},{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"remove","lines":["n"]},{"start":{"row":30,"column":16},"end":{"row":30,"column":17},"action":"remove","lines":["u"]}],[{"start":{"row":30,"column":16},"end":{"row":30,"column":17},"action":"insert","lines":["n"],"id":419},{"start":{"row":30,"column":17},"end":{"row":30,"column":18},"action":"insert","lines":["u"]},{"start":{"row":30,"column":18},"end":{"row":30,"column":19},"action":"insert","lines":["l"]},{"start":{"row":30,"column":19},"end":{"row":30,"column":20},"action":"insert","lines":["l"]}],[{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":["",""],"id":420},{"start":{"row":52,"column":0},"end":{"row":53,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":52,"column":0},"end":{"row":57,"column":2},"action":"insert","lines":["// post, request body O, response O","app.post(\"/api/users/add\", (req, res) => {","    const { id, name } = req.body","    const user = users.concat({ id, name})","    res.json({ok:true, users:user});","})"],"id":421}],[{"start":{"row":55,"column":40},"end":{"row":55,"column":41},"action":"insert","lines":[" "],"id":422}],[{"start":{"row":49,"column":34},"end":{"row":49,"column":35},"action":"insert","lines":[" "],"id":423}],[{"start":{"row":49,"column":14},"end":{"row":49,"column":15},"action":"insert","lines":[" "],"id":424}],[{"start":{"row":56,"column":33},"end":{"row":56,"column":34},"action":"insert","lines":[" "],"id":425}],[{"start":{"row":56,"column":14},"end":{"row":56,"column":15},"action":"insert","lines":[" "],"id":426}]]},"ace":{"folds":[],"scrolltop":270,"scrollleft":0,"selection":{"start":{"row":22,"column":37},"end":{"row":22,"column":37},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":17,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1687936943320,"hash":"d78e214bceca2be3ebb1595699389c6c75539a85"}