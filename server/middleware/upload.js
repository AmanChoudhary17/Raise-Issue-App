import multer from 'multer';

// Use memory storage to get file buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
