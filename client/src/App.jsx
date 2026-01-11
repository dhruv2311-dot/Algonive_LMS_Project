import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllCourses from './pages/AllCourses';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import CourseProgress from './pages/CourseProgress';
import AddCourse from './pages/AddCourse';
import ManageCourses from './pages/ManageCourses';
import Analytics from './pages/Analytics';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/courses/:id/progress"
              element={
                <ProtectedRoute>
                  <CourseProgress />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/add-course"
              element={
                <ProtectedRoute adminOnly>
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/manage-courses"
              element={
                <ProtectedRoute adminOnly>
                  <ManageCourses />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute adminOnly>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

