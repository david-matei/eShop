const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userTypeSchema = new Schema(
    {
        user: {
            type: String,
            required: true
        } 
    }, 
    {
        timestamps: true
    }
);

// Customer
// Employee
// Administrator

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType