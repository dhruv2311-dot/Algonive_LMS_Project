# Learning Management System (LMS)

A complete, production-ready Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 👥 **Role-Based Access** - Student and Admin/Instructor roles
- 📚 **Course Management** - Create, read, update, and delete courses
- 🎯 **Progress Tracking** - Track student progress and completion status
- ☁️ **Cloudinary Integration** - Image upload and storage
- 🎨 **Dark/Light Theme** - Modern UI with theme toggle
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔒 **Protected Routes** - Route protection based on authentication and roles

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication
- bcryptjs (Password Hashing)
- Cloudinary (Image Storage)
- Multer (File Handling)
- CORS

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API (Authentication & Theme)
- CSS (Custom Styling with Dark/Light Theme)

## Project Structure

```
Algonive_Lms/
├── server/                 # Backend
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── cloudinary.js  # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── progressController.js
│   │   └── analyticsController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── progressRoutes.js
│   │   └── analyticsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── client/                 # Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AllCourses.jsx
    │   │   ├── CourseDetails.jsx
    │   │   ├── Profile.jsx
    │   │   ├── MyCourses.jsx
    │   │   ├── CourseProgress.jsx
    │   │   ├── AddCourse.jsx
    │   │   ├── ManageCourses.jsx
    │   │   └── Analytics.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the server directory:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
   
   Then edit `.env` and fill in your actual values:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Get MongoDB Atlas Connection String:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

5. **Get Cloudinary Credentials:**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account
   - Go to Dashboard
   - Copy your Cloud Name, API Key, and API Secret

6. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin only, Protected)
- `PUT /api/courses/:id` - Update course (Admin only, Protected)
- `DELETE /api/courses/:id` - Delete course (Admin only, Protected)
- `POST /api/courses/:id/enroll` - Enroll in course (Protected)

### Progress
- `GET /api/progress` - Get all progress for student (Protected)
- `GET /api/progress/:courseId` - Get course progress (Protected)
- `PUT /api/progress/:courseId` - Update progress (Protected)

### Analytics (Admin only)
- `GET /api/analytics` - Get platform analytics (Protected, Admin)

## User Roles

### Student
- Register and login
- Browse all courses
- Enroll in courses
- Track course progress
- Update profile
- View enrolled courses

### Admin/Instructor
- All student features
- Create courses
- Manage courses (edit/delete)
- Upload course images to Cloudinary
- View platform analytics
- See total students, courses, enrollments

## Features Explained

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Token stored in localStorage
- Protected routes with middleware
- Role-based authorization

### Course Management
- Admins can create courses with images
- Images uploaded to Cloudinary automatically
- Course CRUD operations
- Student enrollment tracking

### Progress Tracking
- Progress percentage (0-100%)
- Status (In Progress / Completed)
- Visual progress bars
- Progress updates

### Theme System
- Dark and light theme toggle
- Theme preference saved in localStorage
- Smooth theme transitions
- Modern UI/UX design

## Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Create account on hosting platform
2. Connect your GitHub repository
3. Set environment variables in platform settings
4. Deploy

### Frontend Deployment (Vercel, Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set API URL in environment variables

## Notes

- This is a production-ready project built for real-world use
- Follows industry best practices
- Clean architecture and scalable structure
- Modern UI/UX with dark/light theme
- Fully responsive design
- Comprehensive error handling

## License

This project is built for internship/educational purposes.

## Support

For issues or questions, please check the code comments or documentation.

---

**Built with ❤️ using MERN Stack**

