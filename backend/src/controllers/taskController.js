import Project from '../models/Project.js';
import Task from '../models/Task.js';

// get user role in project
const getRole = (project, userId) => {
  const member = project.members.find(
    (m) => m.user.toString() === userId.toString()
  );
  return member ? member.role : null;
};

// get tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user._id },
        { createdBy: req.user._id },
      ],
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// create task (only admin)
export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, dueDate } = req.body;

    if (!projectId || !title) {
      return res.status(400).json({ message: 'Project and title required' });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (getRole(project, req.user._id) !== 'Admin') {
      return res.status(403).json({ message: 'Only admin can create task' });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);
    const role = getRole(project, req.user._id);

    if (!role) {
      return res.status(403).json({ message: 'No access' });
    }

    // admin can update everything
    if (role === 'Admin') {
      const { title, description, status } = req.body;

      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
    } 
    // member can only update status
    else {
      if (task.assignedTo?.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not your task' });
      }

      task.status = req.body.status;
    }

    await task.save();

    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// delete task (admin only)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);

    if (getRole(project, req.user._id) !== 'Admin') {
      return res.status(403).json({ message: 'Only admin can delete' });
    }

    await task.deleteOne();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};