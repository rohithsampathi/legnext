// pages/manage-categories.js
import React from 'react';
import ManageCategoriesView from '../components/ManageCategoriesView';
import withAdminAuth from '../components/withAdminAuth';

function ManageCategoriesPage() {
  return <ManageCategoriesView />;
}

export default withAdminAuth(ManageCategoriesPage);
