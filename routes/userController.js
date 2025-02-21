const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Find user
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Generate JWT
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error logging in'});
    }
};
exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists'});
        }

        // Create new user
        const user = new User({username, password});
        await user.save();

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error creating user'});
    }
};

exports.verify = async (req, res) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.json({isValid: false});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists in database
        const user = await User.findById(decoded.userId)
            .select('_id username');

        if (!user) {
            return res.json({isValid: false});
        }

        // Token is valid and user exists
        res.json({
            isValid: true,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        // Token is invalid or expired
        res.json({isValid: false});
    }
}

