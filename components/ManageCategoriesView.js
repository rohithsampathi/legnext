// components/ManageCategoriesView.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { getCategories, addCategory, deleteCategory } from '../utils/data';
import { Home } from 'lucide-react';

const ManageCategoriesView = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button onClick={() => router.push('/dashboard')} className="flex items-center">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          <form onSubmit={handleAddCategory}>
            <Input
              name="category"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Add Category
            </Button>
          </form>
          <h3 className="mt-6 mb-2 font-semibold">Existing Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category} className="flex justify-between items-center mb-2">
                {category}
                <Button
                  onClick={() => handleDeleteCategory(category)}
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

export default ManageCategoriesView;
