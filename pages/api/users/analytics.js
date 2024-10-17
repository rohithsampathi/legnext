import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await dbConnect();

    try {
      const users = await User.find({}).select('-password');
      const userAnalytics = users.map(user => ({
        username: user.username,
        loginCount: user.loginCount,
        totalDuration: Math.round(user.totalDuration / 3600 * 100) / 100, // Convert to hours and round to 2 decimal places
        avgDuration: user.loginCount ? Math.round((user.totalDuration / user.loginCount) / 60 * 100) / 100 : 0, // Convert to minutes and round to 2 decimal places
        issuesRaised: user.issuesRaised,
        upvotesDone: user.upvotesDone,
        lastLogin: user.lastLogin
      }));
      res.status(200).json(userAnalytics);
    } catch (error) {
      console.error('User analytics error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch user analytics' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
