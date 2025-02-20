require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i53p4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("todoDB");
    const userCollection = db.collection("users");
    const taskCollection = db.collection("tasks");

    //save user data in the db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "Already exist", insertedId: null });
      }
      const result = await userCollection.insertOne({
        ...user,
        timeStamp: Date.now(),
      });
      res.send(result);
    });

    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const newTask = { ...task, timestamp: new Date() };
      const result = await taskCollection.insertOne(newTask);
      res.send({ insertedId: result.insertedId, ...newTask });
    });

    // **Fetch Tasks API (GET)**
    app.get("/tasks", async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks);
    });

    // ** Update Task Category API (PUT)**
    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const updatedTask = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updatedTask };

      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // ** Delete Task API (DELETE)**
    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(filter);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Todo's server is runing....");
});

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
