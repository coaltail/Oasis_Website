import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
    },
    price: {
        type: Number,
        required: true
    },
    quantityInStock: {
        type: Number,
        required: true
    }
});

const Product = new mongoose.model("Product", ProductSchema);

export default Product;