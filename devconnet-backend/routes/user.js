import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const users = await User.find({ _id: { $ne: req.user._id } })
    .select('_id name avatar bio skills followers');
  res.json(users);
});
// Get own profile
router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findById(req.user._id);
  res.json(user);
});

// Edit profile
router.put('/me', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { name, bio, skills } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, bio, skills },
    { new: true }
  );
  res.json(user);
});

// Get other user profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-email');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Follow user
router.post('/:id/follow', async (req, res) => {
  if (!req.user || req.user._id === req.params.id)
    return res.status(400).json({ error: 'Invalid operation' });

  const target = await User.findById(req.params.id);
  const current = await User.findById(req.user._id);

  if (!target.followers.includes(req.user._id)) {
    target.followers.push(req.user._id);
    current.following.push(target._id);
    await target.save();
    await current.save();
  }

  res.json({ message: 'Followed' });
});

// Unfollow user
router.post('/:id/unfollow', async (req, res) => {
  const target = await User.findById(req.params.id);
  const current = await User.findById(req.user._id);

  target.followers = target.followers.filter(id => id.toString() !== req.user._id);
  current.following = current.following.filter(id => id.toString() !== req.params.id);

  await target.save();
  await current.save();

  res.json({ message: 'Unfollowed' });
});

export default router;
