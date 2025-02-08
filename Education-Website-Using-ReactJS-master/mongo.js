// const mongoose = require("mongoose");

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/studentss", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//   });

// // Define Schema
// const newSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensures no duplicate emails
//     trim: true, // Removes whitespace
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6, // Minimum password length for basic security
//   },
// });

// // Define Model
// const Collection = mongoose.model("Collection", newSchema);

// // Export the Model
// module.exports = Collection;
