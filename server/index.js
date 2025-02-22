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

    // save task in db
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const newTask = { ...task, timestamp: new Date() };
      const result = await taskCollection.insertOne(newTask);
      res.send({ insertedId: result.insertedId, ...newTask });
    });

    app.get("/tasks", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const query = { email };
      const tasks = await taskCollection.find(query).toArray();
      res.send(tasks);
    });

    // get task details by id
    app.get("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });

    // ** Update Task Category API (PUT)**
    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;

      const updateTask = req.body;
      console.log(updateTask);

      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updateTask };

      try {
        const result = await taskCollection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task updated successfully", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update task" });
      }
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
