const User = require('../../model/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const user = require('../../model/user');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, phone, address, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const userDoc = await User.create({
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: hashPassword,
        });

        const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const userInfo = {
            userId: userDoc._id,
            userName: userDoc.name,
            userEmail: userDoc.email,
            userRole: userDoc.role,
        }

        return res.status(200).json({ success: true, token, userInfo: userInfo, message: "Register Account Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.find({ email: email });

        if (userDoc.length == 0) {
            throw new Error("Email doesn't match");
        }

        const hasPassword = userDoc[0].password;

        const match = await bcrypt.compare(password, hasPassword);

        if (!match) {
            throw new Error("Login failed. Please check your credentials and try again.")
        }

        const token = jwt.sign({ userId: userDoc[0]._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const userInfo = {
            userId: userDoc[0]._id,
            userName: userDoc[0].name,
            userEmail: userDoc[0].email,
            userRole: userDoc[0].role,
        }

        return res.status(201).json({ success: true, token, userInfo: userInfo, message: "Login Successfully" });

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.checkLoginOrNot = async (req, res) => {
    try {
        const Header = req.headers.authorization;
        const Token = Header.split(" ")[1];

        if (Token == "null") {
            throw new Error("Unauthorized");
        }

        return res.status(201).json({ success: true });

    } catch (error) {
        return res.status(401).json({ success: false });
    }
}

exports.checkUserOrNot = async (req, res) => {
    try {
        const Header = req.headers.authorization;
        const Token = Header.split(" ")[1];

        if (Token == "null") {
            throw new Error("Unauthorized");
        }

        const tokenDetail = jwt.verify(Token, process.env.JWT_SECRET_KEY);

        const userId = tokenDetail.userId;

        const userDoc = await User.find({ _id: userId });

        if (userDoc[0].role != "user") {
            throw new Error("Unauthorized");
        }

        return res.status(201).json({ success: true });

    } catch (error) {
        return res.status(401).json({ success: false });
    }
}

exports.checkAdminOrNot = async (req, res) => {
    try {
        const Header = req.headers.authorization;
        const Token = Header.split(" ")[1];

        if (Token == "null") {
            throw new Error("Unauthorized");
        }

        const tokenDetail = jwt.verify(Token, process.env.JWT_SECRET_KEY);

        const userId = tokenDetail.userId;

        const userDoc = await User.find({ _id: userId });

        if (userDoc[0].role == "superadmin" || userDoc[0].role == 'admin') {
            return res.status(201).json({ success: true });
        } else {
            throw new Error("Unauthorized");
        }


    } catch (error) {
        return res.status(401).json({ success: false });
    }
}