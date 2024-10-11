// pages/api/auth.js

import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        flatNumber: user.flatNumber,
        // Include other necessary fields
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        flatNumber: user.flatNumber,
        isAdmin: user.isAdmin,
        // Exclude password from being sent
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
