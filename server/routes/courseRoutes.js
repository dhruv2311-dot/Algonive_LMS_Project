import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/', protect, authorize('admin'), upload.single('image'), createCourse);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

export default router;

