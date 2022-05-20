const connectDB = require("./db");
const express = require('express');

// Connecting to the database
connectDB();

const app = express()
app.use(express.json())
const port = process.env.PORT || 9999;

// All routes
app.use('/api/authenticate', require('./routes/auth'))
app.use('/api/follow', require('./routes/follow'))
app.use('/api/unfollow', require('./routes/unfollow'))
app.use('/api/user', require('./routes/user'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/like', require('./routes/like'))
app.use('/api/unlike', require('./routes/unlike'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/all_posts', require('./routes/all_posts'))

app.get('/', (req, res) => {
    res.send('Working Properly')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})