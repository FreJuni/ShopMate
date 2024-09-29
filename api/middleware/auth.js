const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.split(' ')[1];

        if (token == "null") {
            throw new Error("Unauthorized");
        }

        const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.find({ _id: tokenDetail.userId });

        if (user[0].role == 'superadmin' || user[0].role == 'admin') {
            next();
        } else {
            throw new Error("Authorization Failed");
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}