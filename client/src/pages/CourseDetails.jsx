import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await courseAPI.getCourse(id);
        setCourse(res.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Course not found');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    setError('');
    try {
      await courseAPI.enrollCourse(id);
      alert('Successfully enrolled in course!');
      navigate('/my-courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = course?.studentsEnrolled?.some(
    (studentId) => studentId.toString() === user?._id
  );

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-600 text-xl">Loading course details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <p className="text-gray-600 text-xl mb-8">{error || 'Course not found'}</p>
            <Link to="/courses" className="btn btn-primary">
              Back to Courses
            </Link>
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <div className="w-full overflow-hidden bg-gray-200 border-4 border-black shadow-brutal">
              <img src={course.image} alt={course.title} className="w-full h-auto" />
            </div>

            <div className="flex flex-col gap-6">
              <div className="border-4 border-black bg-black text-white p-4">
                <h1 className="text-4xl font-black uppercase tracking-tight">{course.title}</h1>
              </div>
              <div className="bg-white border-4 border-black p-6 space-y-4 shadow-brutal">
                <div className="text-sm">
                  <span className="font-black uppercase text-black">Created by:</span>{' '}
                  <span className="text-gray-700 font-bold">{course.createdBy?.name || 'Unknown'}</span>
                </div>
                <div className="text-sm">
                  <span className="font-black uppercase text-black">Students enrolled:</span>{' '}
                  <span className="text-gray-700 font-bold">{course.studentsEnrolled?.length || 0}</span>
                </div>
                <div className="text-sm">
                  <span className="font-black uppercase text-black">Created:</span>{' '}
                  <span className="text-gray-700 font-bold">{new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">Description</h2>
                <p className="text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">
                  {course.description}
                </p>
              </div>

              {error && (
                <div className="bg-red-100 text-black border-4 border-black p-4 font-bold shadow-brutal-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4 flex-wrap">
                {isAdmin ? (
                  <Link to="/admin/manage-courses" className="btn btn-secondary">
                    Manage Courses
                  </Link>
                ) : (
                  <>
                    {isEnrolled ? (
                      <Link to={`/courses/${id}/progress`} className="btn btn-primary">
                        Continue Learning
                      </Link>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        className="btn btn-primary"
                        disabled={enrolling}
                      >
                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                      </button>
                    )}
                    <Link to="/courses" className="btn btn-secondary">
                      Back to Courses
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
