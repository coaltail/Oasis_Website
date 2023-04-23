import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    required: true
  },
  products: {
    type: [{
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  billing_address: {
    type: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      }
    },
    required: true
  },
  shipping_address: {
    type: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      }
    },
    required: true
  },
  payment_method: {
    type: {
      name: {
        type: String,
        required: true
      },
      card_number: {
        type: String,
        required: true
      },
      expiration_date: {
        type: String,
        required: true
      },
      cvv: {
        type: String,
        required: true
      }
    },
    required: true
  }
});


const Order = new mongoose.model("Order", orderSchema);

export default Order;