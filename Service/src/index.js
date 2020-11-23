const express = require('express')
const mongo = require('mongodb')
import connect from './db.js';
const cors = require('cors') 
const app = express()  
const port = 3000
app.use(express.json())
app.use(cors())


app.get('/todo_list/:date', async(req, res) =>{
    let data = req.params.date;
    let db = await connect();
    let result = await db.collection("todo_list").find({date: data}).toArray();
    res.json(result)
})

app.get('/api/task/get_one/:id', async(req, res)=>{
    let db = await connect();
    let id = new mongo.ObjectId(req.params.id);
    let results = await db.collection("todo_list").find({_id: id}).toArray();
    res.json(results[0]);
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