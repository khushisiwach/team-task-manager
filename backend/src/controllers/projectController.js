import User from '../models/User.js';
import Project from '../models/Project.js';

const isAdmin = (project, userId) => {
  return project.members.find(
    (m) => m.user.toString() === userId.toString() && m.role === 'Admin'
  );
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      'members.user': req.user._id,
    });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name required' });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: [{ user: req.user._id, role: 'Admin' }],
    });

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const addOrUpdateMember = async (req, res) => {
  try {
    const { email } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!isAdmin(project, req.user._id)) {
      return res.status(403).json({ message: 'Only admin allowed' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    project.members.push({ user: user._id, role: 'Member' });

    await project.save();

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member' });
  }
};

export const removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!isAdmin(project, req.user._id)) {
      return res.status(403).json({ message: 'Only admin allowed' });
    }

    project.members = project.members.filter(
      (m) => m.user.toString() !== req.params.userId
    );

    await project.save();

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Error removing member' });
  }
};