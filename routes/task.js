const express = require('express');
const Task = require('../model/TaskSchema');

const router = express.Router();

router.post('/add', async (req, res) => {
  const { userId, title, description, reminderDate  } = req.body;
  try {
    const newTask = new Task({ userId, title, description, reminderDate  });
    await newTask.save();
    res.status(201).json({ success: true, taskId: newTask._id });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to add task' });
  }
});

router.get('/all', async (req, res) => {
  const { userId } = req.query;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ success: true, getData: tasks });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, updatedTask });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to update task' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndUpdate(
      id,
      { status: 'done and deleted' },
      { new: true }
    );
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
});

module.exports = router;
