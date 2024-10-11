// pages/add-issues.js

import React from 'react';
import AddIssueView from '../components/AddIssueView';
import withAuth from '../components/withAuth';

const AddIssuePage = () => {
  return <AddIssueView />;
};

export default withAuth(AddIssuePage);
