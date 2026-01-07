import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Upload to Cloudinary helper function
export const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    // Convert buffer to base64 data URI
    const base64String = buffer.toString('base64');
    const dataUri = `data:${mimetype};base64,${base64String}`;

    cloudinary.uploader.upload(
      dataUri,
      {
        folder: 'lms-courses',
        transformation: [{ width: 1200, height: 675, crop: 'fill' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

export default cloudinary;

