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
    try {
      const issue = await Issue.findById(id);
      if (!issue.upvotedBy.includes(username)) {
        issue.upvotes += 1;
        issue.upvotedBy.push(username);
        await issue.save();
      }
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upvote issue' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
