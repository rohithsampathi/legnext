// pages/api/categories/counts.js

import dbConnect from '../../../lib/dbConnect';
import Issue from '../../../models/Issue';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const categoryCounts = await Issue.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { name: { $ifNull: ['$_id', 'Unknown'] }, value: '$count', _id: 0 } },
        { $sort: { name: 1 } },
      ]);
      res.status(200).json(categoryCounts);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
