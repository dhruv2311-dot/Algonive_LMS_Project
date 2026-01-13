import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBook, FaChalkboardTeacher, FaChartLine, FaBullseye } from 'react-icons/fa';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Neo-Brutalist */}
        <section className="bg-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="border-4 border-black bg-white p-12 shadow-brutal mb-8">
                <h1 className="text-6xl font-black uppercase tracking-tight text-black mb-6 leading-none">
                  Learning Management System
                </h1>
                <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                <p className="text-lg font-bold uppercase tracking-wide text-gray-700 mb-8">
                  /// Enterprise SaaS Platform for Modern Learning ///
                </p>
                <p className="text-base text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
                  Empowering learners with comprehensive courses, expert instructors, and
                  real-time progress tracking. Start your learning journey today.
                </p>
                <div className="flex gap-6 justify-center flex-wrap">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/register" className="btn btn-primary">
                        Get Started
                      </Link>
                      <Link to="/login" className="btn btn-secondary">
                        Login
                      </Link>
                    </>
                  ) : (
                    <Link to="/dashboard" className="btn btn-primary">
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Neo-Brutalist */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-4 border-black bg-black text-white p-4 mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                /// Platform Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card text-center">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl"><FaBook /></div>
                  <div className="w-3 h-3 bg-blue-500"></div>
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-4 tracking-tight">Comprehensive Courses</h3>
                <p className="text-gray-700 font-medium text-sm">
                  Access a wide range of courses covering various topics and skill levels
                  designed to help you achieve your learning goals.
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl"><FaChalkboardTeacher /></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-4 tracking-tight">Expert Instructors</h3>
                <p className="text-gray-700 font-medium text-sm">
                  Learn from industry experts and experienced instructors who are
                  passionate about sharing their knowledge.
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl"><FaChartLine /></div>
                  <div className="w-3 h-3 bg-yellow-400"></div>
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-4 tracking-tight">Progress Tracking</h3>
                <p className="text-gray-700 font-medium text-sm">
                  Monitor your learning progress with detailed analytics and track your
                  completion status for each course.
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl"><FaBullseye /></div>
                  <div className="w-3 h-3 bg-red-500"></div>
                </div>
                <h3 className="text-xl font-black uppercase text-black mb-4 tracking-tight">Flexible Learning</h3>
                <p className="text-gray-700 font-medium text-sm">
                  Learn at your own pace, anytime, anywhere. Our platform adapts to your
                  schedule and learning style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Neo-Brutalist */}
        <section className="bg-gray-100 py-20 border-t-4 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="border-4 border-black bg-white p-12 shadow-brutal-lg inline-block">
              <h2 className="text-4xl font-black uppercase tracking-tight text-black mb-4">Ready to Start?</h2>
              <p className="text-base font-bold uppercase tracking-wide text-gray-700 mb-8">
                Join thousands of students already learning
              </p>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-primary">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
