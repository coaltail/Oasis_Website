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
};


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

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: '24h' });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    console.log(user);

    user.password = undefined;
    delete user['password'];
    console.log(user);

    // Send the response after all processing is done
    res.status(200).json({ refreshToken, accessToken, user });
  } catch (err) {
    res.status(500).json({ message: `An error has occurred: ${err}` });
  }
};

export const refreshToken = async (req, res) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found." });
    }
    const { userId } = jwt.verify(refreshToken, process.env.JWT_TOKEN);


    const accessToken = jwt.sign({ id: userId }, process.env.JWT_TOKEN, { expiresIn: '1h' });


    const newRefreshToken = jwt.sign({ id: userId }, process.env.JWT_TOKEN, { expiresIn: '7d' });


    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, });


    return res.status(200).json({ accessToken });
  }
  catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
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
    res.cookie('adminAccessToken', token, { httpOnly: true, secure: true });
    delete user.password;

    res.status(200).json({ token, user });


  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}