// components/ManageUsersView.js

import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { getUsers, addUser, deleteUser } from '../utils/data';
import { AuthContext } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

const ManageUsersView = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    flatNumber: '',
    isAdmin: false,
  });
  const [activeView, setActiveView] = useState('manage-users');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isAdmin={user && user.isAdmin}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
            <Card className="mb-6">
              <CardContent>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <Input
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                  <Input
                    name="flatNumber"
                    placeholder="Flat Number"
                    value={newUser.flatNumber}
                    onChange={(e) => setNewUser({ ...newUser, flatNumber: e.target.value })}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={newUser.isAdmin}
                      onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
                      id="isAdmin"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                      Is Admin
                    </label>
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Add User
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Existing Users</CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Flat Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((u) => (
                        <tr key={u._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{u.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{u.flatNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                u.isAdmin
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {u.isAdmin ? 'Admin' : 'Resident'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              onClick={() => handleDeleteUser(u._id)}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageUsersView;
