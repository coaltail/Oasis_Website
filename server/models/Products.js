import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantityInStock: {
        type: String,
        required: true
    }
})

const Product = new mongoose.Schema("Product", ProductSchema);

export default Product;