import Project from '../models/Project.js';

// POST
export const createProject = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.public) filter.isPublic = req.query.public === 'true';
    if (req.query.status) filter.status = req.query.status;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by VISIBILITY
export const getProjectsByVisibility = async (req, res) => {
  try {
    const { visibility } = req.params;
    const projects = await Project.find({ visibility });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT
export const updateProject = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
