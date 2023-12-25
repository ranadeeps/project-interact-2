const express = require('express');
const {MongoClient, ObjectId} = require('mongodb')
const url = 'mongodb://mongo_db:27017/'
//const url = 'mongodb+srv://ranadeeps28:UgXnihSqjT8I7xaq@posts.5v820xp.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
const dbname='PostsApp';

async function store(data){
    await client.connect();
    const db=client.db(dbname);
    const collection = db.collection('Posts');
    const insertResult = await collection.insertOne(data);
    return 'done'
}

async function getData(){
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('Posts');
    const result = await collection.find({}).toArray();
    return result
}

async function getOne(id){
    await client.connect();
    const db = client.db(dbname);
    const collection =db.collection('Posts');
    const result = await collection.findOne({_id:id});
    return result;
}

async function saveComments(id,data){
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('Posts');
    const doc = await collection.findOne({_id:new ObjectId(id)});
    doc.comments.push(data);
    const result = await collection.updateOne({_id:new ObjectId(id)},
    {$set: {
        comments:doc.comments
    }})
    return 'done'
}

const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors({
    origin:'*'
}))

app.get('/getposts',(req,res)=>{
    const data = getData()
    .then((data)=>res.send(data))
    .catch(console.error)
    .finally(()=>client.close());
})

app.post('/receive',(req,res)=>{
    store(req.body)
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(req.body)
})
// app.get('/getone/:id',(req,res)=>{
//     console.log("hereeee");
//     const data = getOne(req.params.id)
//     .then((data)=>res.send(data))
//     .catch(console.error)
//     .finally(()=>client.close());
// })

app.put('/addcomment/:id',(req,res)=>{
    saveComments(req.params.id,req.body)
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json({"comment":req.body.comment})
})

app.listen(3001,()=>{
    console.log("listening on 3001");
})
    