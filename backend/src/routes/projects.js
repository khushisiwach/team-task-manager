import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addOrUpdateMember,
  createProject,
  getProjects,
  removeMember,
} from '../controllers/projectController.js';

const router = express.Router();

router.use(protect);

router.get('/', getProjects);
router.post('/', createProject);
router.post('/:projectId/members', addOrUpdateMember);
router.delete('/:projectId/members/:userId', removeMember);

export default router;