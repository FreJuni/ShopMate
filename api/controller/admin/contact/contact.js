const Contact = require('../../../model/contact');

exports.contacts = async (req, res) => {
    try {
        const contactDoc = await Contact.find();

        return res.status(201).json({ success: true, contactDoc });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}