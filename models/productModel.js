const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageAddress:{
        type: String
    },
    price:{
        type: Number
    },
    description:{
        type: String
    },
    date:{
        type:Date,
		default:Date.now
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;