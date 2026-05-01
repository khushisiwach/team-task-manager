import express from 'express';
// Make sure both your auth middleware AND the new rbac middleware are imported
import { protect } from '../middleware/auth.js'; 
import { requireRole } from '../middleware/rbac.js'; 

const router = express.Router();

// Example: Anyone logged in can get projects
router.get('/', protect, getProjects);

// Example: ONLY admins can create projects
router.post('/', protect, requireRole('admin'), createProject); 

export default router;