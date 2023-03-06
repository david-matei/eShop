const express = require('express') 
const router = express.Router()

const {getAll, getOne, putOne, deleteOne, post } = require("../controllers/user-type")

router.route('/user-type').get(getAll).post(post)
router.route('/user-type/:id').get(getOne).put(putOne).delete(deleteOne)

module.exports = router