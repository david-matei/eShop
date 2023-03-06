const mongoose = require('mongoose');

const productCategory = new mongoose.Schema({
    name: {
        type: String,
    }
})

const Category = mongoose.model('Category', productCategory);
module.exports = Category