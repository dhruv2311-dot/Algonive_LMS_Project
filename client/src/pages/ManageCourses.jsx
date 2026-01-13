import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseAPI.getCourses();
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this course? This action cannot be undone.'
      )
    ) {
      return;
    }

    setDeleting(id);
    try {
      await courseAPI.deleteCourse(id);
      setCourses(courses.filter((course) => course._id !== id));
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-600 text-xl">Loading courses...</p>
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
          <div className="flex justify-between items-start mb-12 flex-wrap gap-4">
            <div className="border-4 border-black p-8 bg-white shadow-brutal flex-1">
              <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">
                Manage Courses
              </h1>
              <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Edit Or Delete Courses ///</p>
            </div>
            <Link to="/admin/add-course" className="btn btn-primary">
              + Add Course
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border-4 border-black p-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 shadow-brutal"
                >
                  <div className="w-full h-48 md:h-full overflow-hidden bg-gray-200 border-4 border-black">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-black uppercase text-black leading-tight">{course.title}</h3>
                    <p className="text-gray-700 font-medium line-clamp-2">{course.description}</p>
                    <div className="flex gap-6 py-4 border-t-4 border-b-4 border-black text-sm">
                      <span>
                        <span className="font-black uppercase text-black">Students:</span>{' '}
                        <span className="text-gray-700 font-bold">{course.studentsEnrolled?.length || 0}</span>
                      </span>
                      <span>
                        <span className="font-black uppercase text-black">Created:</span>{' '}
                        <span className="text-gray-700 font-bold">{new Date(course.createdAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      <Link
                        to={`/courses/${course._id}`}
                        className="btn btn-secondary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-danger"
                        disabled={deleting === course._id}
                      >
                        {deleting === course._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-4 border-black p-20 text-center bg-gray-100">
              <p className="font-bold uppercase tracking-wide text-gray-700 mb-8">No courses found. Create your first course!</p>
              <Link to="/admin/add-course" className="btn btn-primary">
                + Add Course
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageCourses;
