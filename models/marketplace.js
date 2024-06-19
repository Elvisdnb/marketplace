const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
})

module.exports = mongoose.model('products', Products);