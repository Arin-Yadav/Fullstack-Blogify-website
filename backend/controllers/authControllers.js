const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleSignUp(req, res) {
  try {
    const { fullName, email, password } = req.body;
    // note = add a check to see if user already exists

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed" });
  }
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "Invalid login credentials" });

    const hashedPassword = user.password;
    const matchUser = await bcrypt.compare(password, hashedPassword);
    if (!matchUser)
      return res.status(401).json({ error: "Invalid login credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      process.env.JWT_SECRET
    ); // how id => because for any further operations we required id and the id comes from mongoose which auto generates a id.
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
    // res.json({ token }, 200);
  } catch (err) {
    res.json(500).json({ error: "Login error" });
  }
}

module.exports = {
  handleSignUp,
  handleSignIn,
};
