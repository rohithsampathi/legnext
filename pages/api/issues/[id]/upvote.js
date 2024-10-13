// pages/api/issues/[id]/upvote.js

import dbConnect from '../../../../lib/dbConnect';
import Issue from '../../../../models/Issue';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (method === 'POST') {
    const { username } = req.body;

    // Validate that username is provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
      // Atomically increment upvotes and add username to upvotedBy if not already present
      const issue = await Issue.findOneAndUpdate(
        { _id: id, upvotedBy: { $ne: username }, status: { $ne: 'Closed' } },
        {
          $inc: { upvotes: 1 },
          $addToSet: { upvotedBy: username },
        },
        { new: true }
      );

      if (!issue) {
        return res.status(400).json({
          error: 'Cannot upvote issue. It may already be upvoted by you or the issue is closed.',
        });
      }

      res.status(200).json(issue);
    } catch (error) {
      console.error('Upvote Error:', error);
      res.status(500).json({ error: 'Failed to upvote issue' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
