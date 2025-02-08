// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const { MongoClient } = require('mongodb');

// // Setup express app
// const app = express();
// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // For parsing application/json

// const uri = 'mongodb://localhost:27017'; // MongoDB connection string
// const client = new MongoClient(uri);
// let collection;

// async function connectDB() {
//   try {
//     await client.connect();
//     const db = client.db('userDB');
//     collection = db.collection('users');
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.log('MongoDB connection error:', error);
//   }
// }

// connectDB();

// // Register route (signup)
// app.post("/signup", async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const userExists = await collection.findOne({ email });
//       if (userExists) {
//         return res.json({ status: 'exist' });  // User already exists
//       }
  
//       // Hash password before storing
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = {
//         email: email,
//         password: hashedPassword,
//       };
  
//       await collection.insertOne(user);  // Insert user into the database
//       res.json({ status: 'success' });    // Success response
//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({ status: 'fail', message: 'An error occurred during signup' });
//     }
//   });
  

// // Login route
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await collection.findOne({ email });
//       if (!user) {
//         return res.json({ status: "notexist" });  // Email not found
//       }
  
//       // Compare entered password with the hashed password in the DB
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         return res.json({ status: "exist" });  // Successful login
//       } else {
//         return res.json({ status: "wrong" });  // Incorrect password
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ status: "fail", message: "An error occurred during login" });
//     }
//   });
  

// // Start the server
// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('userDB');
    collection = db.collection('users');
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the API. Use POST /signup or POST /login.");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await collection.findOne({ email });
    if (userExists) {
      return res.json({ status: 'exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    await collection.insertOne(user);
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ status: 'fail', message: 'An error occurred during signup' });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.json({ status: "notexist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({ status: "exist" });
    } else {
      return res.json({ status: "wrong" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: "fail", message: "An error occurred during login" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
