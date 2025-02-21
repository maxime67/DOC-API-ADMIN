exports.healthStatus = async (req, res) => {
    try {
        res.status(200).json({message: 'Status OK'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};