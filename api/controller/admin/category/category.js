const Category = require("../../../model/category");


exports.addCategory = async (req, res) => {
    const { category } = req.body;

    try {

        const isAlready = await Category.find({
            category: category
        });

        if (isAlready.length > 0) {
            throw new Error("Category already existed.");
        }

        await Category.create({
            category: category
        });

        return res.status(201).json({ success: true, message: 'Category created Successfully' })


    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

exports.category = async (req, res) => {

    const limit = 10;
    const page = req.query.page || 1;

    try {

        const categoryCount = await Category.countDocuments();

        const category = await Category.find().limit(limit).skip((page - 1) * limit);

        return res.status(201).json({ success: true, category, categoryCount, limit, page })


    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params;

    try {

        const category = await Category.find({ _id: id });

        if (category.length == 0) {
            throw new Error("Category doesn't exist")
        }

        return res.status(201).json({ success: true, category })


    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

exports.update = async (req, res) => {
    const { id, category } = req.body;

    try {

        const categoryDoc = await Category.find({ _id: id });

        if (categoryDoc.length == 0) {
            throw new Error("Something went wrong")
        }

        categoryDoc[0].category = category;
        await categoryDoc[0].save();

        return res.status(201).json({ success: true, message: "Category Updated Successfully" })


    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {

        await Category.findByIdAndDelete({ _id: id });

        return res.status(201).json({ success: true, message: "Category Deleted Successfully" })


    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}