// pages/dashboard.js

import React from 'react';
import DashboardView from '../components/DashboardView';
import withAuth from '../components/withAuth';

const DashboardPage = () => {
  return <DashboardView />;
};

export default withAuth(DashboardPage);
