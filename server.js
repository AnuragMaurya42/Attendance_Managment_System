const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // Import the connectDB function

const app = express();
const faculty = require("./routes/faculty");
const student = require("./routes/student");

// Middleware setup
app.use(express.json({ extended: false }));
app.use(cors());

// Route handlers
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/faculty", faculty);
app.use("/api/student", student);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
