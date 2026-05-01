import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    dueDate: Date,

    priority: {
      type: String,
      default: 'Medium',
    },

    status: {
      type: String,
      default: 'To Do',
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);