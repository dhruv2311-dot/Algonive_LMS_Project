import Course from '../models/Course.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';

// @desc    Get admin analytics
// @route   GET /api/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEnrollments = await Progress.countDocuments();
    const completedCourses = await Progress.countDocuments({ status: 'Completed' });
    
    // Recent courses
    const recentCourses = await Course.find()
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Courses with most enrollments
    const popularCourses = await Course.aggregate([
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          enrollmentCount: { $size: '$studentsEnrolled' },
        },
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalCourses,
      totalStudents,
      totalEnrollments,
      completedCourses,
      recentCourses,
      popularCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

