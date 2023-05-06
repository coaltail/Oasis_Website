
import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id);
        if (!findUser) {
            res.status(500).json({ message: "Could not find the user. " });
        }
        delete findUser.password;
        findUser.password = ""
        res.status(200).send(findUser);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
