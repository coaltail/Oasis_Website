import Order from '../models/Order.js';

export const createNewOrder = async (req, res) => {
    try {
        const
            {
                user_id,
                products,
                total_price,
                billing_address,
                shipping_address,
                payment_method
            } = req.body;
        if (!user_id || !products || !total_price || !billing_address || !shipping_address || !payment_method) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        if (typeof total_price !== 'number' || !Array.isArray(products)) {
            return res.status(400).json({ error: 'Invalid input format.' });
        }
        const newOrder = await Order.create({
            user_id: user_id,
            products: products,
            total_price: total_price,
            billing_address: billing_address,
            shipping_address: shipping_address,
            payment_method: payment_method
        });
        return res.status(201).json({ order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Could not create new order.' });
    }
}
