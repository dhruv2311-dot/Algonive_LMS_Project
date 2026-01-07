import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Course from './models/Course.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Upload image to Cloudinary from URL
const uploadImageToCloudinary = async (imageUrl, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'lms-courses',
      public_id: publicId,
      overwrite: true,
    });
    console.log(`✅ Image uploaded: ${publicId}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading image ${publicId}:`, error.message);
    return null;
  }
};

// Sample course images (you can replace these with actual Cloudinary URLs or local paths)
const courseImages = {
  webDevelopment: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  pythonProgramming: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
  dataScience: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses\n');

    // Create admin user if not exists
    let adminUser = await User.findOne({ email: 'admin@lms.com' });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@lms.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created: admin@lms.com / admin123\n');
    } else {
      console.log('✅ Admin user already exists\n');
    }

    // Upload images to Cloudinary
    console.log('📤 Uploading images to Cloudinary...\n');
    const webDevImage = await uploadImageToCloudinary(
      courseImages.webDevelopment,
      'web-development-course'
    );
    const pythonImage = await uploadImageToCloudinary(
      courseImages.pythonProgramming,
      'python-programming-course'
    );
    const dataScienceImage = await uploadImageToCloudinary(
      courseImages.dataScience,
      'data-science-course'
    );

    console.log('');

    // Sample courses data (matching actual Course schema)
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description:
          'Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer. This comprehensive course covers everything you need to become a professional web developer.',
        image: webDevImage || courseImages.webDevelopment,
        createdBy: adminUser._id,
      },
      {
        title: 'Python Programming for Beginners',
        description:
          'Learn Python from scratch. Cover fundamentals, data structures, OOP, and build practical projects. Perfect for absolute beginners with no coding experience. Master Python programming and start your journey into the world of programming.',
        image: pythonImage || courseImages.pythonProgramming,
        createdBy: adminUser._id,
      },
      {
        title: 'Data Science & Machine Learning',
        description:
          'Dive into data science and machine learning. Learn Python libraries like NumPy, Pandas, and Scikit-learn. Build predictive models and analyze real-world datasets. Transform your career with in-demand data science skills.',
        image: dataScienceImage || courseImages.dataScience,
        createdBy: adminUser._id,
      },
    ];

    // Insert courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Successfully created ${createdCourses.length} courses\n`);

    // Display created courses
    createdCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - Image: ${course.image ? '✅ Uploaded' : '❌ Missing'}`);
      console.log(`   - Created by: ${course.createdBy}`);
      console.log('');
    });

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('   Email: admin@lms.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
connectDB().then(() => seedDatabase());
