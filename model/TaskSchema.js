const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'pending' },
    reminderDate: { type: Date }, // Ensure this line is correctly defined
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
      }
});

module.exports = mongoose.model('Tasks', TaskSchema, 'Tasks');
