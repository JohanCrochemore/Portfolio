import Profile from '../models/Profile.js';

// GET all
export const getProfile = async (req, res) => {
  try {
   const profile = await Profile.findOne();
   if(!profile)
   {
    return res.status(404).json({ error: "Profile not found"});
   }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(updates);
    } else {
      Object.assign(profile, updates);
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

