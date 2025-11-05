import User from '../models/User.js';

// POST
export const createUser = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });
  try {
    const User = new User(req.body);
    const saved = await User.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllUsers = async (req, res) => {
  try {
   const Users = await User.find({}).sort({ createdAt: -1 });
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
export const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    if (!User) return res.status(404).json({ msg: 'Not found' });
    res.json(User);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT
export const updateUser = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
