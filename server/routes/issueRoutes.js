import express from 'express';
import { createIssue, getAllIssues, getMyIssues } from '../controllers/issueController.js';
import issueUserAuth from '../middleware/issueUserAuth.js';
import multer from 'multer';
const issueRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
// POST /api/issue - Create a new issue (protected)
issueRouter.post('/upload', issueUserAuth,upload.single('image'), createIssue);

// GET /api/issue/all - Get all issues (public or protected based on your app logic)
issueRouter.get('/all', getAllIssues);

// GET /api/issue/my - Get issues posted by currently logged-in user
issueRouter.get('/my', issueUserAuth, getMyIssues);


export default issueRouter;
