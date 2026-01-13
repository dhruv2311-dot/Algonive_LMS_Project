import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password && formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }

      const res = await authAPI.updateProfile(updateData);
      updateUser(res.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-brutal">
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">Profile Settings</h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Manage Your Account ///</p>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-brutal">
            <div className="mb-8 pb-8 border-b-4 border-black">
              <div className="space-y-6">
                <div>
                  <label className="block font-black uppercase text-black text-sm tracking-wide mb-2">Email</label>
                  <p className="text-gray-700 font-bold">{user.email}</p>
                </div>
                <div>
                  <label className="block font-black uppercase text-black text-sm tracking-wide mb-2">Role</label>
                  <p className="inline-block bg-black text-white px-4 py-2 border-4 border-black text-sm font-bold uppercase shadow-brutal-sm capitalize">
                    {user.role}
                  </p>
                </div>
                <div>
                  <label className="block font-black uppercase text-black text-sm tracking-wide mb-2">Member Since</label>
                  <p className="text-gray-700 font-bold">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6">Update Profile</h2>

              {message.text && (
                <div
                  className={`p-4 border-4 mb-6 font-bold shadow-brutal-sm ${
                    message.type === 'error'
                      ? 'bg-red-100 text-black border-black'
                      : 'bg-green-100 border-black text-black'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>

              {formData.password && (
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
