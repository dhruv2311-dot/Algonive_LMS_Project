import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { progressAPI, courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, progressRes] = await Promise.all([
          courseAPI.getCourse(id),
          progressAPI.getCourseProgress(id),
        ]);
        setCourse(courseRes.data);
        setProgress(progressRes.data);
        setProgressValue(progressRes.data.progressPercentage);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/my-courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleUpdateProgress = async () => {
    setUpdating(true);
    try {
      const res = await progressAPI.updateProgress(id, {
        progressPercentage: progressValue,
      });
      setProgress(res.data);
      alert('Progress updated successfully!');
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

  const handleComplete = async () => {
    setUpdating(true);
    try {
      const res = await progressAPI.updateProgress(id, {
        progressPercentage: 100,
      });
      setProgress(res.data);
      setProgressValue(100);
      alert('Course marked as completed!');
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

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

  if (!course || !progress) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Neo-Brutalist */}
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-brutal">
            <Link
              to="/my-courses"
              className="text-black font-bold uppercase text-sm hover:bg-black hover:text-white px-4 py-2 border-2 border-black inline-block mb-4 transition-all"
            >
              ← Back
            </Link>
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">{course.title}</h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Track Your Progress ///</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Progress Section */}
            <div className="bg-white border-4 border-black p-8 shadow-brutal">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white border-4 border-black p-6 text-center shadow-brutal">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-3 h-3 bg-blue-500"></div>
                  </div>
                  <h3 className="text-5xl font-black text-black mb-2">
                    {progress.progressPercentage}%
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-700">Complete</p>
                </div>
                <div className="bg-white border-4 border-black p-6 text-center shadow-brutal">
                  <div className="flex justify-end items-start mb-2">
                    <div className={`w-3 h-3 ${progress.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
                  </div>
                  <h3
                    className={`text-2xl font-black uppercase mb-2 ${
                      progress.status === 'Completed' ? 'text-black' : 'text-gray-700'
                    }`}
                  >
                    {progress.status}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-700">Status</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="w-full h-8 bg-gray-200 border-4 border-black overflow-hidden">
                  <div
                    className="h-full bg-black transition-all"
                    style={{ width: `${progress.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="form-label mb-4 block">Update Progress (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 border-4 border-black rounded-none appearance-none cursor-pointer accent-black"
                  />
                  <div className="text-center text-3xl font-black text-black mt-4">
                    {progressValue}%
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={handleUpdateProgress}
                    className="btn btn-primary"
                    disabled={updating || progressValue === progress.progressPercentage}
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                  {progress.status !== 'Completed' && (
                    <button
                      onClick={handleComplete}
                      className="btn btn-secondary"
                      disabled={updating}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Course Info Section */}
            <div className="bg-white border-4 border-black p-6 h-fit shadow-brutal">
              <div className="w-full overflow-hidden mb-6 bg-gray-200 border-4 border-black">
                <img src={course.image} alt={course.title} className="w-full h-auto" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">Course Info</h2>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">{course.description}</p>
              <div className="space-y-3 py-4 border-t-4 border-b-4 border-black mb-6">
                <div className="text-sm">
                  <span className="font-black uppercase text-black">Created by:</span>{' '}
                  <span className="text-gray-700 font-bold">{course.createdBy?.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-black uppercase text-black">Students enrolled:</span>{' '}
                  <span className="text-gray-700 font-bold">{course.studentsEnrolled?.length || 0}</span>
                </div>
              </div>
              <Link to={`/courses/${id}`} className="btn btn-secondary w-full text-center">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseProgress;
