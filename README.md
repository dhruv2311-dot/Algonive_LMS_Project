# Learning Management System (LMS)

A complete, production-ready Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring an **Enterprise Neo-Brutalist** design system.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 👥 **Role-Based Access** - Student and Admin/Instructor roles
- 📚 **Course Management** - Create, read, update, and delete courses
- 🎯 **Progress Tracking** - Track student progress and completion status
- ☁️ **Cloudinary Integration** - Image upload and storage
- 🎨 **Enterprise Neo-Brutalist UI** - Modern, professional design system
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔒 **Protected Routes** - Route protection based on authentication and roles
- 📊 **Analytics Dashboard** - Comprehensive platform statistics (Admin)
- 💼 **Enterprise-Ready** - Professional, internship-acceptable design

## 🎨 Design System

### Neo-Brutalist Enterprise Theme

This LMS features a refined **Neo-Brutalist** design that balances bold aesthetics with enterprise usability:

#### Design Principles
- **Clean Typography** - Bold, readable fonts without excessive decoration
- **Selective Shadows** - Hard offset shadows (6px 6px 0) on primary cards only
- **Refined Borders** - 2px borders on main containers for structure
- **Minimal Accents** - Status colors (green, amber, red, blue) for indicators only
- **Data-First** - Prioritizes readability and long-term usability
- **Professional** - Corporate-appropriate, internship-ready appearance

#### Visual Elements
- ⚫⚪ **Black & White Dominance** - Primary color scheme
- 📦 **Rectangular Shapes** - No rounded corners
- 🎯 **Hard Shadows** - Offset shadows without blur (cards only)
- 🔲 **2px Borders** - Clean, refined borders on containers
- 🔵🟢🟡🔴 **Status Dots** - Small 2x2px colored indicators
- 📏 **Comfortable Spacing** - 16-32px gaps for breathability

#### Components
- **Stat Cards** - Dashboard metrics with selective shadows
- **Course Cards** - Clean, scannable course information
- **Forms** - Professional inputs without shadows
- **Buttons** - Flat, rectangular with subtle hover states
- **Navigation** - Clean navbar with 2px border
- **Section Headers** - Black background reserved for headers

## 🛠️ Tech Stack

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
- Context API (Authentication)
- Tailwind CSS (Enterprise Neo-Brutalist Design)
- React Icons

## 📁 Project Structure

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
    │   │   ├── AddCourse.jsx (Admin)
    │   │   ├── ManageCourses.jsx (Admin)
    │   │   └── Analytics.jsx (Admin)
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css          # Enterprise Neo-Brutalist Design System
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Setup Instructions

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

## 🔌 API Endpoints

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

## 👥 User Roles

### Student
- Register and login
- Browse all courses
- Enroll in courses
- Track course progress
- Update profile
- View enrolled courses
- Monitor completion status

### Admin/Instructor
- All student features
- Create courses with images
- Manage courses (edit/delete)
- Upload course images to Cloudinary
- View platform analytics
- See total students, courses, enrollments
- Track completion rates

## 💡 Features Explained

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
- Course image management

### Progress Tracking
- Progress percentage (0-100%)
- Status (In Progress / Completed)
- Visual progress bars
- Progress updates
- Completion tracking

### Design System
- Enterprise Neo-Brutalist aesthetic
- Refined 2px borders
- Selective hard shadows (6px 6px 0)
- Clean, professional typography
- Status indicators with minimal colors
- Data-first approach
- Long-session friendly

## 🎨 Design Documentation

For detailed design system information, see:
- `ENTERPRISE_REFINEMENTS.md` - Complete design refinement guide

### CSS Classes

#### Buttons
```css
.btn              /* Base button with 2px border */
.btn-primary      /* Black background, white text */
.btn-secondary    /* White background, black text */
```

#### Cards
```css
.card             /* White card with 2px border, 6px shadow */
.stat-card        /* Dashboard stat card with shadow */
```

#### Utilities
```css
.shadow-brutal    /* 6px 6px 0 shadow */
.border-brutal    /* 2px black border */
.section-header   /* Black background header */
```

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Create account on hosting platform
2. Connect your GitHub repository
3. Set environment variables in platform settings
4. Deploy

### Frontend Deployment (Vercel, Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set API URL in environment variables

## 📝 Notes

- Production-ready project built for real-world use
- Follows industry best practices
- Clean architecture and scalable structure
- Enterprise Neo-Brutalist UI design
- Fully responsive design
- Comprehensive error handling
- Internship/portfolio ready
- Professional, corporate-appropriate design

## 📄 License

This project is built for internship/educational purposes.

## 🤝 Support

For issues or questions, please check the code comments or documentation.

---

**Built with ❤️ using MERN Stack + Enterprise Neo-Brutalist Design**

**Design Philosophy:** "Neo-Brutalist, but make it enterprise" - Bold without being aggressive, structured without being rigid, modern without being experimental.

