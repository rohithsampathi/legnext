import React from 'react';
import DashboardView from '../components/DashboardView';
import withAdminAuth from '../components/withAdminAuth';

const UserAnalyticsPage = () => {
  return <DashboardView activeView="userAnalytics" />;
};

export default withAdminAuth(UserAnalyticsPage);
