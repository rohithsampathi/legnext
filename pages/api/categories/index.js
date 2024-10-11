// pages/api/categories/index.js

import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else if (req.method === 'POST') {
    const { name } = req.body;
    try {
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
