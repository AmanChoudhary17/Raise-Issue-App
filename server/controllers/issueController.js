import issueModel from '../models/issueModel.js';
import { uploadImageToCloudinary } from '../utils/cloudinary.js';
export const createIssue = async (req, res) => {
  console.log("Body:", req.body);
console.log("File:", req.file);
  try {
    const { title, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    const newIssue = await issueModel.create({
      title,
      image: imageUrl,
      description,
      postedBy: req.userId,
    });

    res.status(201).json({ success: true, data: newIssue });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllIssues = async (req, res) => {
    try {
        const issues = await issueModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: issues });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getMyIssues = async (req, res) => {
    try {
        const myIssues = await issueModel.find({ postedBy: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: myIssues });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

