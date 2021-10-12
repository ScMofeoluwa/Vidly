const Joi = require("joi")
const express = require('express')
const router = express.Router()


const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'adventure' },
    { id: 3, name: 'comedy' },
    { id: 4, name: 'fantasy' },
    { id: 5, name: 'horror' },
    { id: 6, name: 'romance' },
    { id: 7, name: 'fiction' }
]


router.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(i => i.id == parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre with the given ID doesn't exist")
    res.send(genre)
})

router.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

router.put('/api/genres/:id', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = genres.find(i => i.id == parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre with the given ID doesn't exist")

    genre.name = req.body.name
    res.send(genre)
})

router.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(i => i.id == parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre with the given ID doesn't exist")

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

module.exports = router