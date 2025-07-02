import express from 'express';
import { createIssue, getAllIssues, getMyIssues } from '../controllers/issueController.js';
import issueUserAuth from '../middleware/issueUserAuth.js';

const issueRouter = express.Router();

// POST /api/issue - Create a new issue (protected)
issueRouter.post('/issue/upload', issueUserAuth, createIssue);

// GET /api/issue/all - Get all issues (public or protected based on your app logic)
issueRouter.get('/issue/all', getAllIssues);

// GET /api/issue/my - Get issues posted by currently logged-in user
issueRouter.get('/issue/my', issueUserAuth, getMyIssues);


export default issueRouter;
