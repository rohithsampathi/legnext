// pages/profile.js
import React from 'react';
import ProfileView from '../components/ProfileView';
import withAuth from '../components/withAuth';

function ProfilePage() {
  return <ProfileView />;
}

export default withAuth(ProfilePage);
