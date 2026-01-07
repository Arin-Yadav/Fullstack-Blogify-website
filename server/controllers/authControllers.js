const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
    if (!user) return res.status(404).json({ error: "User not found" });

    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email }, process.env.JWT_SECRET); // how id
    res.json({ token }, 200);
  } catch (err) {
    res.json(500).json({ error: "Login error" });
  }
}

module.exports = {
  handleSignUp,
  handleSignIn,
};
