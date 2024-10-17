import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, duration } = req.body;

    await dbConnect();

    try {
      const user = await User.findOne({ username });
      if (user) {
        user.totalDuration += duration;
        await user.save();
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
