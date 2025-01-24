const Documentation = require('../models/Documentation');

exports.createDocumentation = async (req, res) => {
  try {
    const documentation = new Documentation({
      name: req.body.name,
      category: req.body.category,
      link: req.body.link,
      description: req.body.description,
      state: req.body.state
    });
    const savedDoc = await documentation.save();
    await savedDoc.populate('category');
    res.status(201).json(savedDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    const documentation = await Documentation.findById(req.params.id).populate('category');
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          category: req.body.category,
          link: req.body.link,
          description: req.body.description,
          state: req.body.state
        },
        { new: true }
    ).populate('category');

    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.json(documentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByIdAndDelete(req.params.id);
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.json({ message: 'Documentation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocumentationByCategory = async (req, res) => {
  try {
    const documentation = await Documentation.find({ category: req.params.categoryId })
        .populate('category');
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocumentationByName = async (req, res) => {
  try {
    const documentation = await Documentation.find({ name: { $regex: `^.*${req.params.name}.*$`, $options: 'i' } })
        .populate('category');
    res.json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
