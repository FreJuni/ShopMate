const User = require('../../../model/user');
const bcryptjs = require('bcryptjs');

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, userId } = req.body;

    try {

        const userDoc = await User.find({ _id: userId });

        const oldUserPassword = userDoc[0].password;

        const match = await bcryptjs.compare(oldPassword, oldUserPassword);

        if (!match) {
            throw new Error("Old password doesn't match");
        }

        const hashPassword = await bcryptjs.hash(newPassword, 10);

        userDoc[0].password = hashPassword;
        await userDoc[0].save();

        return res.status(201).json({ success: true, message: "Password Change Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}