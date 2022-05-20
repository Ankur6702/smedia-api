const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// JWT Secret Key
const JWT_SECRET = "#";

router.post('/', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: 'error', errors: errors.array(), message: "name, email and password are required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        console.log('User created successfully: ', user);
        res.json({ status: 'success', message: 'User created', token });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

module.exports = router