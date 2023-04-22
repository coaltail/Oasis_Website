import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerNewUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddress,
      billingAddress,
      phone
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      shippingAddress,
      billingAddress,
      phone
    })
    const sUser = await newUser.save();
    res.status(201).json(sUser);

  }

  catch (error) {
    res.status(500).json({ message: `An errror has occured: ${error}` });
  }
}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    delete user.password;

    // Send the response after all processing is done
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: `An error has occurred: ${err}` });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const
      {
        email,
        password
      } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Admin does not exist." });

    if (user.role != "admin") return res.status(403).json({ message: "Access denied, you are not an admin. " });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.status(403).json({ message: "Invalid credentials " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_ADMIN);
    delete user.password;

    res.status(200).json({ token, user });


  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}