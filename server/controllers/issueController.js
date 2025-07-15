import issueModel from '../models/issueModel.js';
import { uploadImageToCloudinary } from '../utils/cloudinary.js';

// Create Issue
export const createIssue = async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);

  try {
    const { title, description, latitude, longitude } = req.body;
    let imageUrl = '';
    let locationLink = '';

    // Upload image if file exists
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    // Validate location
    if (latitude && longitude) {
      locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required for location.',
      });
    }

    const newIssue = await issueModel.create({
      title,
      image: imageUrl,
      description,
      postedBy: req.userId,
      locationLink,
      latitude,
      longitude,
    });

    res.status(201).json({ success: true, data: newIssue });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await issueModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get issues by current user
export const getMyIssues = async (req, res) => {
  try {
    const myIssues = await issueModel.find({ postedBy: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: myIssues });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🆕 Delete an issue
export const deleteIssue = async (req, res) => {
  try {
    const issue = await issueModel.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    // Check if the issue belongs to the logged-in user
    if (issue.postedBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await issue.deleteOne();
    res.json({ success: true, message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
