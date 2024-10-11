// components/AddIssueView.js

import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { addIssue, getCategories } from '../utils/data';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Header from './Header';

const AddIssueView = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        console.log('Fetched Categories:', categoriesData); // For debugging
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subject && description && category) {
      try {
        await addIssue({
          subject,
          category,
          description,
          createdBy: user.username,
        });
        alert('Issue raised successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to add issue:', error);
        setError('Failed to raise issue. Please try again.');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-secondary text-white py-6">
            <h2 className="text-3xl font-semibold">Raise a New Issue</h2>
            <p className="text-gray-200 mt-2">
              Help us improve by reporting any issues you encounter.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject"
                  maxLength={200}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the issue"
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Issue
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddIssueView;
