import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBook, FaUsers, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await analyticsAPI.getAnalytics();
        setAnalytics(res.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-600 text-xl">Loading analytics...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const completionRate =
    analytics.totalEnrollments > 0
      ? ((analytics.completedCourses / analytics.totalEnrollments) * 100).toFixed(1)
      : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Neo-Brutalist */}
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-brutal">
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">
              Analytics Dashboard
            </h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Platform Statistics ///</p>
          </div>

          {/* Stats Grid - Neo-Brutalist */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl"><FaBook /></div>
                <div className="w-3 h-3 bg-blue-500"></div>
              </div>
              <h2 className="text-5xl font-black text-black mb-2">{analytics.totalCourses}</h2>
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">Total Courses</p>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl"><FaUsers /></div>
                <div className="w-3 h-3 bg-green-500"></div>
              </div>
              <h2 className="text-5xl font-black text-black mb-2">{analytics.totalStudents}</h2>
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">Total Students</p>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl"><FaFileAlt /></div>
                <div className="w-3 h-3 bg-yellow-400"></div>
              </div>
              <h2 className="text-5xl font-black text-black mb-2">{analytics.totalEnrollments}</h2>
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">Total Enrollments</p>
            </div>
            <div className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl"><FaCheckCircle /></div>
                <div className="w-3 h-3 bg-green-500"></div>
              </div>
              <h2 className="text-5xl font-black text-black mb-2">{analytics.completedCourses}</h2>
              <p className="text-sm font-bold uppercase tracking-wide text-gray-700">Completed Courses</p>
            </div>
          </div>

          {/* Completion Rate - Neo-Brutalist */}
          <div className="bg-white border-4 border-black p-8 mb-12 max-w-md shadow-brutal">
            <h3 className="text-xl font-black uppercase tracking-tight text-black mb-4">Completion Rate</h3>
            <div className="text-5xl font-black text-black mb-4">{completionRate}%</div>
            <div className="w-full h-6 bg-gray-200 border-4 border-black overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          {/* Courses Section - Neo-Brutalist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-black p-8 shadow-brutal">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-black">Recent Courses</h2>
                <Link to="/admin/manage-courses" className="btn btn-secondary text-sm">
                  View All
                </Link>
              </div>
              {analytics.recentCourses && analytics.recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {analytics.recentCourses.map((course) => (
                    <div
                      key={course._id}
                      className="flex items-center gap-4 p-4 bg-white border-4 border-black shadow-brutal-sm"
                    >
                      <div className="w-16 h-16 overflow-hidden bg-gray-200 border-4 border-black flex-shrink-0">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black uppercase text-black text-sm">{course.title}</h4>
                        <p className="text-xs text-gray-700 font-bold">By {course.createdBy?.name || 'Unknown'}</p>
                      </div>
                      <Link
                        to={`/courses/${course._id}`}
                        className="btn btn-secondary text-sm"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-4 border-black p-8 text-center bg-gray-100">
                  <p className="font-bold uppercase tracking-wide text-gray-700">No recent courses</p>
                </div>
              )}
            </div>

            <div className="bg-white border-4 border-black p-8 shadow-brutal">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6">Popular Courses</h2>
              {analytics.popularCourses && analytics.popularCourses.length > 0 ? (
                <div className="space-y-4">
                  {analytics.popularCourses.map((course, index) => (
                    <div
                      key={course._id || index}
                      className="flex items-center gap-4 p-4 bg-white border-4 border-black shadow-brutal-sm"
                    >
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-lg flex-shrink-0 border-4 border-black">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black uppercase text-black text-sm">{course.title}</h4>
                        <p className="text-xs text-gray-700 font-bold">
                          {course.enrollmentCount || 0} enrollments
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-4 border-black p-8 text-center bg-gray-100">
                  <p className="font-bold uppercase tracking-wide text-gray-700">No popular courses yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
