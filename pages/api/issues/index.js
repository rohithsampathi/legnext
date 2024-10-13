// pages/api/issues/index.js

import dbConnect from '../../../lib/dbConnect';
import Issue from '../../../models/Issue';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const issues = await Issue.find({});
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch issues' });
    }
  } else if (req.method === 'POST') {
    const { subject, category, description, createdBy, flatNumber } = req.body;
    try {
      const newIssue = new Issue({
        subject,
        category,
        description,
        createdBy,
        flatNumber,
        upvotes: 0,
        upvotedBy: [],
        createdOn: new Date(),
        status: 'Open',
      });
      await newIssue.save();
      res.status(201).json(newIssue);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create issue' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
