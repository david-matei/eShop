const express = require('express')
const router = express.Router()

const {getAll, getAllFromCategory, getOne, post, remove, put} = require('../controllers/product')

router.get('/product', getAll)
router.get('/product/category/:categoryId', getAllFromCategory)
router.get('/product/:id', getOne)
router.post('/product', post)
router.delete('/product/:id', remove)
router.put('/product/:id', put)
module.exports = router