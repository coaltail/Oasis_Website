import Product from "../models/Products.js";

export const createNewProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            image,
            price,
            quantityInStock
        } = req.body;
        const newProduct = new Product({
            productName,
            description,
            image,
            price,
            quantityInStock
        })
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}