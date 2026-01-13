import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI, progressAPI, analyticsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBook, FaUsers, FaFileAlt, FaCheckCircle, FaBookOpen, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin) {
          const [analyticsRes, coursesRes] = await Promise.all([
            analyticsAPI.getAnalytics(),
            courseAPI.getCourses(),
          ]);
          setStats(analyticsRes.data);
          setCourses(coursesRes.data.slice(0, 6));
        } else {
          const [progressRes, coursesRes] = await Promise.all([
            progressAPI.getProgress(),
            courseAPI.getCourses(),
          ]);
          const enrolledCount = progressRes.data.length;
          const completedCount = progressRes.data.filter(p => p.status === 'Completed').length;
          setStats({
            enrolledCourses: enrolledCount,
            completedCourses: completedCount,
            inProgress: enrolledCount - completedCount,
          });
          setCourses(coursesRes.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-600 text-xl">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Refined */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-lg text-gray-600">
              {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
            </p>
          </div>

          {isAdmin ? (
            <>
              {/* Admin Stats Grid - Enterprise */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaBook /></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.totalCourses || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Total Courses</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaUsers /></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.totalStudents || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Total Students</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaFileAlt /></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.totalEnrollments || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Total Enrollments</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaCheckCircle /></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.completedCourses || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Completed Courses</p>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="flex gap-6 mb-12 flex-wrap">
                <Link to="/admin/add-course" className="btn btn-primary">
                  + Add Course
                </Link>
                <Link to="/admin/manage-courses" className="btn btn-secondary">
                  Manage Courses
                </Link>
                <Link to="/admin/analytics" className="btn btn-secondary">
                  Analytics
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Student Stats Grid - Enterprise */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaBookOpen /></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.enrolledCourses || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Enrolled Courses</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaChartLine /></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.inProgress || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">In Progress</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl text-gray-700"><FaCheckCircle /></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-2">{stats?.completedCourses || 0}</h3>
                  <p className="text-sm font-semibold text-gray-600">Completed</p>
                </div>
              </div>

              {/* Student Actions */}
              <div className="flex gap-6 mb-12 flex-wrap">
                <Link to="/courses" className="btn btn-primary">
                  Browse Courses
                </Link>
                <Link to="/my-courses" className="btn btn-secondary">
                  My Courses
                </Link>
              </div>
            </>
          )}

          {/* Recent Courses Section */}
          <div className="mt-16">
            <div className="section-header mb-6">
              <h2 className="text-xl">Recent Courses</h2>
            </div>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/courses/${course._id}`}
                    className="card overflow-hidden"
                  >
                    <div className="w-full h-48 bg-gray-100 border-2 border-black mb-4 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 leading-tight">{course.title}</h3>
                    <p className="text-gray-600 mb-4 font-normal text-sm line-clamp-2">{course.description}</p>
                    <div className="flex justify-between text-xs font-semibold pt-4 border-t-2 border-gray-200">
                      <span className="text-gray-600">By {course.createdBy?.name || 'Unknown'}</span>
                      {!isAdmin && <span className="text-gray-600">{course.studentsEnrolled?.length || 0} students</span>}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border-2 border-gray-300 p-12 text-center bg-gray-50">
                <p className="font-semibold text-gray-600">No courses available yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
