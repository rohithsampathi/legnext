// pages/api/issues/[id].js

import dbConnect from '../../../lib/dbConnect';
import Issue from '../../../models/Issue';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const { status } = req.body;

        // Validate that status is provided and is one of the allowed values
        const validStatuses = ['Open', 'In Progress', 'On Hold', 'Closed'];
        if (!status || !validStatuses.includes(status)) {
          return res.status(400).json({ success: false, error: 'Invalid or missing status.' });
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
          id,
          { status },
          { new: true, runValidators: true }
        );

        if (!updatedIssue) {
          return res.status(404).json({ success: false, error: 'Issue not found.' });
        }

        res.status(200).json(updatedIssue);
      } catch (error) {
        console.error('Update Issue Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedIssue = await Issue.findByIdAndDelete(id);

        if (!deletedIssue) {
          return res.status(404).json({ success: false, error: 'Issue not found.' });
        }

        res.status(200).json({ success: true, message: 'Issue deleted successfully.' });
      } catch (error) {
        console.error('Delete Issue Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
