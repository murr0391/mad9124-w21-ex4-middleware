
const {cars} = require('../data')
const validateCarId = require('../middleware/validateCarId')
const express = require('express')
const router = express.Router()

router.use('/:carId', validateCarId)


// define routes
router.get('/', (req, res) => res.send({ data: cars }))

router.get('/:carId', (req, res) => {
    res.send({ data: cars[req.carIndex] })
})

router.post('/', (req, res) => {
    const { make, model, colour } = req.body
    const newCar = {
        id: Date.now(),
        make,
        model,
        colour
    }
    cars.push(newCar)
    res.status(201).send({ data: newCar })
})

router.put('/:carId', (req, res) => {
    const { make, model, colour } = req.body
    const updatedCar = { id: parseInt(req.params.carId), make, model, colour }
    cars[req.carIndex] = updatedCar
    res.send({data: updatedCar})
})

router.patch('/:carId', (req, res) => {
    const {id, ...theRest} = req.body
    const updatedCar = Object.assign({}, cars[req.carIndex], theRest)
    cars[req.carIndex] = updatedCar
    res.send({data: updatedCar})
})

router.delete('/:carId', (req, res) => {
    const deletedCar = cars[req.carIndex]
    cars.splice(req.carIndex, 1)
    res.send({data: deletedCar})
})

module.exports = router