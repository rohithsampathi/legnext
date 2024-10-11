// pages/api/users/[username]/password.js
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const {
    query: { username },
    method,
  } = req;

  await dbConnect();

  if (method === 'PUT') {
    try {
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { password: hashedPassword },
        { new: true }
      ).select('-password');
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
