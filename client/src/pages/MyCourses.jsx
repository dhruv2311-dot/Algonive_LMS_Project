import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { progressAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyCourses = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await progressAPI.getProgress();
        setProgress(res.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'bg-green-500' : 'bg-yellow-400';
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-600 text-xl">Loading your courses...</p>
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
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-brutal">
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">
              My Courses
            </h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Track Your Learning Progress ///</p>
          </div>

          {progress.length > 0 ? (
            <div className="space-y-8">
              {progress.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border-4 border-black p-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 shadow-brutal"
                >
                  <div className="w-full h-48 md:h-full overflow-hidden bg-gray-200 border-4 border-black">
                    <img
                      src={item.courseId?.image}
                      alt={item.courseId?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-black uppercase text-black leading-tight">{item.courseId?.title}</h3>
                    <p className="text-gray-700 font-medium line-clamp-2">{item.courseId?.description}</p>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-black uppercase text-black text-sm tracking-wide">Progress</span>
                        <span
                          className={`px-4 py-2 border-4 border-black text-xs font-bold uppercase shadow-brutal-sm ${
                            item.status === 'Completed'
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-400 text-black'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 border-4 border-black overflow-hidden mb-2">
                        <div
                          className={`h-full transition-all ${getStatusColor(item.status)}`}
                          style={{ width: `${item.progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-bold uppercase text-gray-700 tracking-wide">{item.progressPercentage}% Complete</div>
                    </div>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      <Link
                        to={`/courses/${item.courseId?._id}/progress`}
                        className="btn btn-primary"
                      >
                        Continue
                      </Link>
                      <Link
                        to={`/courses/${item.courseId?._id}`}
                        className="btn btn-secondary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-4 border-black p-20 text-center bg-gray-100">
              <p className="font-bold uppercase tracking-wide text-gray-700 mb-8">
                You haven't enrolled in any courses yet.
              </p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCourses;
