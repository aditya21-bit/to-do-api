const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Add Task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Task
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;