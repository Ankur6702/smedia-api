const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')

router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.json({ status: 'error', message: 'Post not found' })
        }
        totalLikes = post.likes.length
        totalUnlikes = post.unlikes.length
        totalComments = post.comments.length
        const newPost = {
            id: post._id,
            numberOfLikes: totalLikes,
            numberOfUnlikes: totalUnlikes,
            numberOfComments: totalComments,
        }
        res.json({ status: 'success', newPost, message: 'Post fetched successfully' })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

router.post('/', fetchUser, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('content').not().isEmpty().withMessage('Content is required')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            status: 'error',
            message: errors.array()
        })
    }
    try {
        const userId = req.user.id
        const { title, content} = req.body
        const post = new Post({
            user: userId,
            title,
            content
        });
        await post.save();
        const newPost = {
            id: post._id,
            title,
            content,
            CreatedAt: post.date,
        }
        res.json({ status: 'success', message: 'Post added successfully', newPost })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.json({
                status: 'error',
                message: 'Post not found'
            })
        }
        if (post.user.toString() !== userId) {
            return res.json({
                status: 'error',
                message: 'Unauthorized'
            })
        }
        await Post.findByIdAndDelete(req.params.id)
        res.json({ status: 'success', message: 'Post deleted successfully' })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

module.exports = router