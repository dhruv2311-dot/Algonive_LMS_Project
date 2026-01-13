import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {/* Header - Neo-Brutalist */}
          <div className="border-4 border-black bg-white p-8 shadow-brutal mb-12">
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">
              All Courses
            </h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Browse Complete Course Library ///</p>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/${course._id}`}
                  className="card overflow-hidden"
                >
                  <div className="w-full h-48 bg-gray-200 border-4 border-black mb-4 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-black mb-3 leading-tight">{course.title}</h3>
                  <p className="text-gray-700 mb-4 font-medium line-clamp-3">{course.description}</p>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide pt-4 border-t-4 border-black">
                    <span className="text-gray-700">By {course.createdBy?.name || 'Unknown'}</span>
                    <span className="text-gray-700">{course.studentsEnrolled?.length || 0} Students</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-4 border-black p-16 text-center bg-gray-100">
              <p className="font-bold uppercase tracking-wide text-gray-700">No courses available yet. Check back later!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllCourses;
