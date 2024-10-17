import React from 'react';
import DashboardView from '../components/DashboardView';
import withAuth from '../components/withAuth';

const IssuesPage = () => {
  return <DashboardView activeView="issues" />;
};

export default withAuth(IssuesPage);
