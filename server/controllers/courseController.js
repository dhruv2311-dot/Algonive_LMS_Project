import Course from '../models/Course.js';
import Progress from '../models/Progress.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide title and description' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a course image' });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    const imageUrl = result.secure_url;

    const course = await Course.create({
      title,
      description,
      image: imageUrl,
      createdBy: req.user._id,
    });

    const populatedCourse = await Course.findById(course._id).populate(
      'createdBy',
      'name email'
    );

    res.status(201).json(populatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the creator
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      course.image = result.secure_url;
    }

    const updatedCourse = await course.save();
    const populatedCourse = await Course.findById(updatedCourse._id).populate(
      'createdBy',
      'name email'
    );

    res.json(populatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the creator
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    // Delete related progress records
    await Progress.deleteMany({ courseId: course._id });

    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (course.studentsEnrolled.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.studentsEnrolled.push(req.user._id);
    await course.save();

    // Create progress record
    await Progress.create({
      studentId: req.user._id,
      courseId: course._id,
      progressPercentage: 0,
      status: 'In Progress',
    });

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

