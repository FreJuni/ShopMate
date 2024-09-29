const User = require('../../../model/user');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();
const { extractPublicId } = require('cloudinary-build-url');
const bcryptjs = require('bcryptjs');

exports.getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const userDoc = await User.find({ _id: id }).select('name email phone address image');

        if (userDoc.length == 0) {
            throw new Error('Something went wrong')
        }

        return res.status(201).json({ success: true, userDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.updateProfile = async (req, res) => {
    const { name, email, phone, address, userId } = req.body;
    const image = req.file;

    try {
        const userDoc = await User.find({ _id: userId });

        if (userDoc.length == 0) {
            throw new Error('Something went wrong')
        }

        if (image == undefined) {
            userDoc[0].name = name;
            userDoc[0].email = email;
            userDoc[0].phone = phone;
            userDoc[0].address = address;
            userDoc[0].image = userDoc[0].image;

            await userDoc[0].save();
        } else {
            if (userDoc[0].image != null) {
                publicId = extractPublicId(userDoc[0].image);
                cloudinary.uploader.destroy(publicId, async (error, result) => {
                    if (!error) {
                        cloudinary.uploader.upload(image.path, async (error, result) => {
                            if (!error) {
                                const url = result.url;

                                userDoc[0].name = name;
                                userDoc[0].email = email;
                                userDoc[0].phone = phone;
                                userDoc[0].address = address;
                                userDoc[0].image = url;

                                await userDoc[0].save();
                            }
                        })
                    }
                })
            } else {
                cloudinary.uploader.upload(image.path, async (error, result) => {
                    if (!error) {
                        const url = result.url;

                        userDoc[0].name = name;
                        userDoc[0].email = email;
                        userDoc[0].phone = phone;
                        userDoc[0].address = address;
                        userDoc[0].image = url;

                        await userDoc[0].save();
                    }
                })
            }
        }

        return res.status(201).json({ success: true, message: 'Profile Updated Successfully' });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

exports.addNewAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const hashPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: 'admin'
        })

        return res.status(201).json({ success: true, message: "Add New Admin Successfully" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}