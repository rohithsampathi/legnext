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
        const updatedIssue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedIssue) {
          return res.status(404).json({ success: false, error: 'Issue not found' });
        }
        res.status(200).json(updatedIssue);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedIssue = await Issue.deleteOne({ _id: id });
        if (!deletedIssue.deletedCount) {
          return res.status(404).json({ success: false, error: 'Issue not found' });
        }
        res.status(200).json({ success: true, message: 'Issue deleted' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
