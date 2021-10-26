const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// user: car-mechanics
// password: pJVfvJtO9cVBN6HG

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yai2s.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_HOST}`).collection("services");
    // console.log("Database connected");

    // POST API
    app.post('/services', async(req, res) =>{
        const service = req.body;
        const result = await collection.insertOne(service);
        res.json(result);
        // console.log(req.body);
    })

    // GET API
    app.get('/services', async(req, res) =>{
        const services = await collection.find({}).toArray();
        res.json(services);
    })

    // DELETE API
    app.delete('/services/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await collection.deleteOne(query);
        res.send(result);
    })
  
//   client.close();
});


app.get('/', (req, res) =>{
    res.send("Server Running..");
})

app.listen(port, () =>{
    console.log("Server running on port: ", port);
})