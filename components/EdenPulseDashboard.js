// components/EdenPulseDashboard.js

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './Card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { getCategoryCounts, getIssueCountsByStatus } from '../utils/data';

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#795548'];
const STATUS_COLORS = {
  Open: '#4CAF50',
  'In Progress': '#2196F3',
  'On Hold': '#FFC107',
  Closed: '#FF5722',
};

const EdenPulseDashboard = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [issueCountsByStatus, setIssueCountsByStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategoryCounts();
        setCategoryCounts(categoriesData);

        const issuesByStatusData = await getIssueCountsByStatus();
        setIssueCountsByStatus(issuesByStatusData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>Issues by Category</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryCounts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  label
                >
                  {categoryCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Issues by Status</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={issueCountsByStatus}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                                <Bar dataKey="value" name="Issues">
                  {issueCountsByStatus.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EdenPulseDashboard;
