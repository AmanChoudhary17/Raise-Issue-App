import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true},
    description: { type: String, required: false },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    // 📍 Location fields
    locationLink: { type: String, required: true}, // e.g., https://www.google.com/maps?q=lat,lng
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }

}, {
    timestamps: true
});

const issueModel = mongoose.models.issue || mongoose.model('issue', issueSchema);

export default issueModel;
