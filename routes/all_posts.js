const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const fetchUser = require('../middleware/fetchUser')

router.get('/', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const posts = await Post.find({ user: userId })
        if(!posts) {
            return res.json({ status: 'error', message: 'No posts found' })
        }

        const allPosts = posts.map(post => {
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                date: post.date,
                likes: post.likes.length,
                unlikes: post.unlikes.length,
                comments: post.comments,
            }
        })

        allPosts.sort((a, b) => {
            return b.date - a.date
        })
        res.json({ status: 'success', allPosts, message: 'Posts of current user are fetched successfully in sorted order' })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

module.exports = router