// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, canEdit: user.canEdit },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      id: user._id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
