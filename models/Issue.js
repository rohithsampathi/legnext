// models/Issue.js

import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  flatNumber: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'On Hold', 'Closed'],
    default: 'Open',
  },
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
