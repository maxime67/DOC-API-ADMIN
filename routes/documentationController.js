const Documentation = require('../models/Documentation');


exports.getAllDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.find({}).populate('category');

    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findById(req.params.id).populate('category').sort('updatedAt');
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getDocumentationByCategory = async (req, res) => {
  try {
    const documentation = await Documentation.find({ category: req.params.categoryId })
        .populate('category')
        .sort('updatedAt');
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocumentationByName = async (req, res) => {
  try {
    const documentation = await Documentation.find({ name: { $regex: req.params.name, $options: 'i' } })
        .populate('category');
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
