import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            LMS
          </Link>

          <div className="flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/courses"
                  className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Courses
                </Link>
                {isAdmin ? (
                  <>
                    <Link
                      to="/admin/add-course"
                      className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                    >
                      Add
                    </Link>
                    <Link
                      to="/admin/manage-courses"
                      className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                    >
                      Manage
                    </Link>
                    <Link
                      to="/admin/analytics"
                      className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                    >
                      Analytics
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/my-courses"
                    className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                  >
                    My Courses
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Profile
                </Link>
                <span className="text-gray-600 text-xs font-semibold px-3 py-2 border-l-2 border-gray-300">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary text-sm ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/courses"
                  className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Courses
                </Link>
                <Link
                  to="/login"
                  className="text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-sm ml-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
