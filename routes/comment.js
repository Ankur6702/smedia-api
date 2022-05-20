const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')

router.post('/:id', fetchUser, [
    body('comment').not().isEmpty().withMessage('Comment is required'),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            status: 'error',
            message: errors.array()
        })
    }
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const { comment } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.json({ status: 'error', message: 'Post not found' });
        }

        post.comments.push({
            comment: comment,
            userId: userId,
            postId: postId
        });
        await post.save(); 
        const commentId = post.comments[post.comments.length - 1]._id;
        
        res.json({ status: 'success', message: 'Comment posted', commentId});
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});
module.exports = router