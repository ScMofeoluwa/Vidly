const express = require('express')
const router = express.Router()

router.get('/api/genres', (req, res) => {
    res.send(genres)
})

module.exports = router