//pages/api/users/[username].js

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const {
    query: { username },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const deletedUser = await User.findOneAndDelete({ username });
        if (!deletedUser) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}