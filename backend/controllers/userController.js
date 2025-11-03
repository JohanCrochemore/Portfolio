import User from '../models/User.js';

// GET par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Pour demo, ne renvoyer que l'identifiant et role
    if (user.role === 'demo') {
      return res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        canEdit: user.canEdit,
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT par ID (interdit pour demo)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
