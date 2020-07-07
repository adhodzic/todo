const express = require('express')
const mongo = require('mongodb')
import connect from './db.js';
const cors = require('cors') 
const app = express()  
const port = 3000
app.use(express.json())
app.use(cors())


app.get('/todo_list', async(req, res) =>{
    let db = await connect();
    let result = await db.collection("todo_list").find({}).toArray();
    console.log
    res.json(result)
})

app.get('/done_list', (req, res) =>{
    let data = [
        {title: "done prvi"},
        {title: "done drugi"},
        {title: "done treci"},
        {title: "done cetvrti"},
        {title: "done peti"}
    ]
    res.json(data)
})

app.post('/add_task', async(req, res) =>{
    let db = await connect();
    let data = req.body;
    console.log(req.body)
    let result = await db.collection('todo_list').insertOne(data)
    res.json(data)
})

app.patch('/set_done/:id', async(req, res) =>{
    let db = await connect();
    let id = req.params.id;
    let result = await db.collection('todo_list').updateOne(
        { _id: mongo.ObjectId(id) },
        {
            $set: {done: true},
        }
    );
    res.json("OK");
})

app.put('/edit_task/:id', async(req, res) =>{
    let db = await connect();
    let data = req.body;
    console.log(data)
    let id = req.params.id;
    let result = await db.collection('todo_list').updateOne(
        { _id: mongo.ObjectId(id) },
        {
            $set: {
                title: data.title,
                done: data.done
            }
        }
    );
    res.json("OK");
})


app.listen(port, () => console.log(`Slušam na portu: ${port}`))