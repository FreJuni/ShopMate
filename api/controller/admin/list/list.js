const User = require('../../../model/user');

exports.admin = async (req, res) => {

    const limit = 8;
    const page = req.query.page || 1;

    try {

        const count = await User.find({
            $or: [
                { role: 'admin' },
                { role: 'superadmin' }
            ]
        }).countDocuments();

        const listDoc = await User.find({
            $or: [
                { role: 'admin' },
                { role: 'superadmin' }
            ]
        }).limit(limit).skip((page - 1) * limit);

        return res.status(201).json({ success: true, listDoc, count });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.user = async (req, res) => {

    const limit = 8;
    const page = req.query.page || 1;

    try {

        const count = await User.find({ role: 'user' }).countDocuments();

        const listDoc = await User.find({ role: 'user' }).limit(limit).skip((page - 1) * limit);

        return res.status(201).json({ success: true, listDoc, count });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.changeToUser = async (req, res) => {
    const { id } = req.params;
    try {
        const listDoc = await User.find({ _id: id });

        if (listDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        listDoc[0].role = 'user'
        await listDoc[0].save();

        return res.status(201).json({ success: true, message: "Change To User Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.changeToAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const listDoc = await User.find({ _id: id });

        if (listDoc.length == 0) {
            throw new Error("Something went wrong");
        }

        listDoc[0].role = 'admin'
        await listDoc[0].save();

        return res.status(201).json({ success: true, message: "Change To Admin Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {

        await User.findByIdAndDelete({ _id: id });

        return res.status(201).json({ success: true, message: "Delete User Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.getUsers = async (req, res) => {

    try {

        const userDoc = await User.find();

        return res.status(201).json({ success: true, userDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}
