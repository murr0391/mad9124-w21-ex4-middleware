const { cars } = require('./cars.js')
const express = require('express')
const router = express.Router()

// define routes
router.get('/', (req, res) => res.send({ data: cars }))

router.get('/:carId', (req, res) => {
    const car = cars.find(car => car.id === parseInt(req.params.carId))
    res.send({ data: car })
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
    const id = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === id)
    if (index < 0) {
        res.status(404).send({
            errors: [
                {
                    status: '404',
                    title: 'Resource does not exist',
                    description: `We could not find a car with id: ${id}`
                }
            ]
        })
    } else {
        const { make, model, colour } = req.body
        const updatedCar = { id, make, model, colour }
        cars[index] = updatedCar
        res.send({ data: updatedCar })
    }
})

router.patch('/:carId', (req, res) => {
    const id = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === id)
    if (index < 0) {
        res.status(404).send({
            errors: [
                {
                    status: '404',
                    title: 'Resource does not exist',
                    description: `We could not find a car with id: ${id}`
                }
            ]
        })
    } else {
        const { id, ...theRest } = req.body
        const updatedCar = Object.assign({}, cars[index], theRest)
        cars[index] = updatedCar
        res.send({ data: updatedCar })
    }
})

router.delete('/:carId', (req, res) => {
    const id = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === id)
    if (index < 0) {
        res.status(404).send({
            errors: [
                {
                    status: '404',
                    title: 'Resource does not exist',
                    description: `We could not find a car with id: ${id}`
                }
            ]
        })
    } else {
        // splice returns an array of the removed items
        const deletedCars = cars.splice(index, 1)
        res.send({ data: deletedCars[0] })
    }
})

module.exports = router