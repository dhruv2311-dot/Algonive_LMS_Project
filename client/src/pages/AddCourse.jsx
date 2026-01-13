import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.image) {
      setError('Please upload a course image');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('image', formData.image);

      await courseAPI.createCourse(data);
      navigate('/admin/manage-courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-brutal">
            <h1 className="text-5xl font-black uppercase tracking-tight text-black mb-3">
              Add New Course
            </h1>
            <p className="text-base font-bold uppercase tracking-wide text-gray-700">/// Create Course For Students ///</p>
          </div>

          <div className="bg-white border-4 border-black p-8 shadow-brutal">
            {error && (
              <div className="bg-red-100 text-black border-4 border-black p-4 mb-6 font-bold shadow-brutal-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Course Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter course description"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Course Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="block border-4 border-dashed border-black p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors shadow-brutal-sm"
                >
                  {preview ? (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto border-4 border-black"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl block mb-4">📷</span>
                      <p className="text-gray-700 font-bold uppercase text-sm">Click to upload course image</p>
                    </>
                  )}
                </label>
              </div>

              <div className="flex gap-4 justify-end mt-8 flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate('/admin/manage-courses')}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating Course...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddCourse;
