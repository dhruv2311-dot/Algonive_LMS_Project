import Progress from '../models/Progress.js';
import Course from '../models/Course.js';

// @desc    Get all progress for a student
// @route   GET /api/progress
// @access  Private
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ studentId: req.user._id })
      .populate('courseId')
      .sort({ updatedAt: -1 });
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress for a specific course
// @route   GET /api/progress/:courseId
// @access  Private
export const getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId,
    }).populate('courseId');

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update progress
// @route   PUT /api/progress/:courseId
// @access  Private
export const updateProgress = async (req, res) => {
  try {
    const { progressPercentage } = req.body;

    if (progressPercentage < 0 || progressPercentage > 100) {
      return res.status(400).json({ message: 'Progress must be between 0 and 100' });
    }

    let progress = await Progress.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId,
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    progress.progressPercentage = progressPercentage;
    progress.status = progressPercentage === 100 ? 'Completed' : 'In Progress';

    const updatedProgress = await progress.save();
    const populatedProgress = await Progress.findById(updatedProgress._id).populate(
      'courseId'
    );

    res.json(populatedProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

