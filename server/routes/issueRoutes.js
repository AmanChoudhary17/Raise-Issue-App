import express from 'express';
import { createIssue, getAllIssues, getMyIssues, deleteIssue} from '../controllers/issueController.js';
import issueUserAuth from '../middleware/issueUserAuth.js';
import multer from 'multer';

const issueRouter = express.Router();

// Configure multer to use memory storage (suitable for Cloudinary)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
  }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

issueRouter.post('/upload', issueUserAuth, upload.single('image'), createIssue);
issueRouter.get('/all', getAllIssues);
issueRouter.get('/my', issueUserAuth, getMyIssues);
issueRouter.delete('/:id', issueUserAuth, deleteIssue);
// issueRouter.put('/:id', issueUserAuth, upload.single('image'), updateIssue);

export default issueRouter;
