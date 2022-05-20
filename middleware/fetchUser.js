const jwt = require('jsonwebtoken');
const JWT_SECRET = "JHDFAUHYSFVBHgkjhgsfdgbkjahtguiwet789236t076t5^&%*&^%^40tgyuzksgfd ";

const fetchUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.json({
            status: 'error',
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.json({
            status: 'error',
            message: 'Token is not valid'
        });
    }
};

module.exports = fetchUser;