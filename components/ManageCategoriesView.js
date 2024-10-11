// components/ManageCategoriesView.js

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { getCategories, addCategory, deleteCategory } from '../utils/data';
import { AuthContext } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

const ManageCategoriesView = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [activeView, setActiveView] = useState('manage-categories');

  const fetchCategories = async () => {
    const categoriesData = await getCategories();
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory) {
      await addCategory(newCategory);
      await fetchCategories();
      alert('Category added successfully');
      setNewCategory('');
    } else {
      alert('Please enter a category name');
    }
  };

  const handleDeleteCategory = async (category) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(category);
      await fetchCategories();
      alert('Category deleted successfully');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isAdmin={user && user.isAdmin}
        />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
            <Card className="mb-6">
              <CardContent>
                <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <Input
                    name="category"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="mb-4 md:mb-0 md:flex-1"
                  />
                  <Button type="submit" className="w-full md:w-auto">
                    Add Category
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Existing Categories</CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category Name
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              onClick={() => handleDeleteCategory(category)}
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

export default ManageCategoriesView;
