import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 5
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    shippingAddress: {
        type: String,
        required: true,

    },
    billingAddress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    paymentMethods: [{
        name: String,
        cardNumber: String,
        expirationDate: String,
        cvv: String
    }],
    role:{
        type : String,
        enum : ["user", "admin"],
        required: true,
        default: "user",
    }

})

const User = mongoose.model("User", userSchema);

export default User;