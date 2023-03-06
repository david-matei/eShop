const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategory'
        },
        price: {
            type: Number,
            required: true
        },
        quantity: { 
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product