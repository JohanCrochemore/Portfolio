import BlogPost from '../models/BlogPost.js';

// POST
export const createBlogPost = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const post = new BlogPost(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all
export const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by STATUS

export const getBlogPostByStatus = async (req, res) => {
    try{
        const { status } = req.params;
        const posts = await BlogPost.find({ status });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET latest post

export const getLatestPosts = async (req, res) => {
  try{
    const posts = await BlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(posts);
  } catch (error)
  {
    res.status(500).json({ message: error.message })
  }
};

// PUT
export const updateBlogPost = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteBlogPost = async (req, res) => {
  if (req.user?.role === 'demo') return res.status(403).json({ msg: 'Lecture seule pour demo' });

  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
