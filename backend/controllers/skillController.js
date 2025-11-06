import Skills from "../models/Skills.js";

// POST
export const createSkills = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });
  try {
    const skills = new Skills(req.body);
    const saved = await skills.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllSkills = async (req, res) => {
  try {
   const skills = await Skills.find({}).sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
export const getSkillsById = async (req, res) => {
  try {
    const skills = await Skills.findById(req.params.id);
    if (!skills) return res.status(404).json({ msg: 'Not found' });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT
export const updateSkills = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const updated = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteSkills = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    await Skills.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
