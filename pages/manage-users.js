// pages/manage-users.js
import React from 'react';
import ManageUsersView from '../components/ManageUsersView';
import withAdminAuth from '../components/withAdminAuth';

function ManageUsersPage() {
  return <ManageUsersView />;
}

export default withAdminAuth(ManageUsersPage);
