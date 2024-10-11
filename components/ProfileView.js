// components/ProfileView.js
import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { updateUserPassword } from '../utils/data';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Header from './Header';

const ProfileView = () => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (
      passwords.newPassword === passwords.confirmPassword &&
      passwords.currentPassword === user.password
    ) {
      await updateUserPassword(user.username, passwords.newPassword);
      const updatedUser = { ...user, password: passwords.newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Password updated successfully');
      router.push('/dashboard');
    } else {
      alert('Password mismatch or incorrect current password');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>Profile</CardHeader>
        <CardContent>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Flat Number:</strong> {user.flatNumber}
          </p>
          <form onSubmit={handleChangePassword} className="mt-4">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="mb-4"
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="mb-4"
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;
