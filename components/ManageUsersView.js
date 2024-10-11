// components/ManageUsersView.js
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { getUsers, addUser, deleteUser } from '../utils/data';
import { useRouter } from 'next/router';
import { Home } from 'lucide-react';

const ManageUsersView = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    flatNumber: '',
    isAdmin: false,
  });

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.username && newUser.password && newUser.flatNumber) {
      await addUser(newUser);
      await fetchUsers();
      alert('User added successfully');
      setNewUser({
        username: '',
        password: '',
        flatNumber: '',
        isAdmin: false,
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      await fetchUsers();
      alert('User deleted successfully');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <Button onClick={() => router.push('/dashboard')} className="flex items-center">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardContent>
          <form onSubmit={handleAddUser}>
            <Input
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="mb-4"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="mb-4"
            />
            <Input
              name="flatNumber"
              placeholder="Flat Number"
              value={newUser.flatNumber}
              onChange={(e) => setNewUser({ ...newUser, flatNumber: e.target.value })}
              className="mb-4"
            />
            <div className="mb-4">
              <input
                type="checkbox"
                name="isAdmin"
                checked={newUser.isAdmin}
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
                id="isAdmin"
              />
              <label htmlFor="isAdmin" className="ml-2">
                Is Admin
              </label>
            </div>
            <Button type="submit" className="w-full">
              Add User
            </Button>
          </form>
          <h3 className="mt-6 mb-2 font-semibold">Existing Users</h3>
          <ul>
            {users.map((u) => (
              <li key={u._id} className="flex justify-between items-center mb-2">
                {u.username} ({u.flatNumber})
                <Button
                  onClick={() => handleDeleteUser(u._id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersView;
