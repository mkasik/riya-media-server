const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
var ObjectId = require('mongodb').ObjectId;
const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nbkldt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const dataCollection = client.db('media').collection('post-data');
        const commentCollection = client.db('media').collection('comment');



        app.post('/post-data', async (req, res) => {
            const data = req.body;
            const result = await dataCollection.insertOne(data);
            res.send(result);
        });
        app.get('/post-data', async (req, res) => {
            const query = {}
            const cursor = dataCollection.find(query);
            const data = await cursor.toArray();
            res.send(data);
        });
        app.post('/comment', async (req, res) => {
            const data = req.body;
            const result = await commentCollection.insertOne(data);
            res.send(result);
        });
        app.get('/comment', async (req, res) => {
            const query = {}
            const cursor = commentCollection.find(query);
            const data = await cursor.toArray();
            res.send(data);
        });

    }
    finally {

    }
}
run().catch(err => console.error(err));

app.listen(port, () => {
    console.log(`runnig on port ${port}`)
})