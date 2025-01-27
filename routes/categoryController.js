const CategoryController = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        console.log(req.body);
        const category = new CategoryController({
            name: req.body.name
        });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryController.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await CategoryController.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'CategoryController not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await CategoryController.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'CategoryController not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await CategoryController.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'CategoryController not found' });
        }
        res.json({ message: 'CategoryController deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};