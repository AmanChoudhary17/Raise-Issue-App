import jwt from "jsonwebtoken";

const issueUserAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default issueUserAuth;
