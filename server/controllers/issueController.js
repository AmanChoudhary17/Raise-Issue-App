import issueModel from '../models/issueModel.js';

export const createIssue = async (req, res) => {
    try {
        const { title, image, description } = req.body;

        const newIssue = await issueModel.create({
            title,
            image,
            description,
            postedBy: req.userId
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

