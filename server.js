const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const faculty = require("./routes/faculty");
const student = require("./routes/student");

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/faculty", faculty);
app.use("/api/student", student);

const PORT = process.env.PORT || 5000;
const mongoURI = "mongodb://127.0.0.1:27017/anurag"; // or "mongodb://localhost:27017/anurag"

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Database connection error:", err);
});
