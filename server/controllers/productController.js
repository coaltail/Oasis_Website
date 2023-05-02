import Product from "../models/Products.js";

export const createNewProduct = async (req, res) => {
    console.log(req.file);
    try {
        const {
            productName,
            description,
            price,
            quantityInStock
        } = req.body;

        const newProduct = new Product({
            productName,
            description,
            image: req.file.filename,
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

export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) return res.status(400).json({ message: "Product does not exist" });

        res.status(200).json(product);

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}