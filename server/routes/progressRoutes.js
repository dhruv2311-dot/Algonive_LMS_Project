import express from 'express';
import {
  getProgress,
  getCourseProgress,
  updateProgress,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProgress);
router.get('/:courseId', protect, getCourseProgress);
router.put('/:courseId', protect, updateProgress);

export default router;

