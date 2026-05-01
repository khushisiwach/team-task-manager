import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const getDashboard = async (req, res) => {
  try {
    const projects = await Project.find({
      'members.user': req.user._id,
    });

    const projectIds = projects.map((p) => p._id);

    const tasks = await Task.find({
      project: { $in: projectIds },
    });

    let totalTasks = tasks.length;
    let todo = 0;
    let inProgress = 0;
    let done = 0;
    let overdue = 0;

    tasks.forEach((task) => {
      if (task.status === 'To Do') todo++;
      else if (task.status === 'In Progress') inProgress++;
      else if (task.status === 'Done') done++;

      if (task.dueDate && task.status !== 'Done') {
        if (new Date(task.dueDate) < new Date()) {
          overdue++;
        }
      }
    });

    res.json({
      totalProjects: projects.length,
      totalTasks,
      todo,
      inProgress,
      done,
      overdue,
      recentTasks: tasks.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard' });
  }
};