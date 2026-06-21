const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/tasks", taskRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("To-Do API Running");
});

const PORT = process.env.PORT || 5000;

// Connect MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected Successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((err) => {

        console.log("MongoDB Connection Error:");
        console.log(err);

    });