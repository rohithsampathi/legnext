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
  ComposedChart,
  Line,
} from 'recharts';
import { getCategoryCounts, getIssueCounts } from '../utils/data';

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#795548'];
const STATUS_COLORS = {
  Open: '#4CAF50',
  'In Progress': '#2196F3',
  'On Hold': '#FFC107',
  Closed: '#FF5722',
};

const EdenPulseDashboard = ({ issues }) => {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [issueCounts, setIssueCounts] = useState([]);
  const [monthlyIssueCounts, setMonthlyIssueCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategoryCounts();
        const issueData = await getIssueCounts();
        setCategoryCounts(categoryData);
        setIssueCounts(issueData);

        // Process issues to get monthly counts
        const monthlyCounts = getMonthlyIssueCounts(issues);
        setMonthlyIssueCounts(monthlyCounts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (issues && issues.length > 0) {
      fetchData();
    }
  }, [issues]);

  const getMonthlyIssueCounts = (issues) => {
    const months = Array.from({ length: 12 }, (_, index) =>
      new Date(0, index).toLocaleString('default', { month: 'short' })
    );

    // Initialize counts for each status per month
    const data = months.map((month) => ({
      month,
      Open: 0,
      'In Progress': 0,
      'On Hold': 0,
      Closed: 0,
    }));

    issues.forEach((issue) => {
      const date = new Date(issue.createdOn);
      const monthIndex = date.getMonth();
      const status = issue.status;
      if (data[monthIndex][status] !== undefined) {
        data[monthIndex][status] += 1;
      }
    });

    // Calculate total issues per month
    data.forEach((item) => {
      item.total =
        item.Open + item['In Progress'] + item['On Hold'] + item.Closed;
    });

    return data;
  };

  if (!categoryCounts.length || !issueCounts.length || !monthlyIssueCounts.length) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues by Category */}
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

        {/* Issues by Status */}
        <Card>
          <CardHeader>Issues by Status</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={issueCounts}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Issues">
                  {issueCounts.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Issues Trend */}
      <Card>
        <CardHeader>Monthly Issues Trend</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyIssueCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Open" stackId="a" fill={STATUS_COLORS['Open']} />
              <Bar dataKey="In Progress" stackId="a" fill={STATUS_COLORS['In Progress']} />
              <Bar dataKey="On Hold" stackId="a" fill={STATUS_COLORS['On Hold']} />
              <Bar dataKey="Closed" stackId="a" fill={STATUS_COLORS['Closed']} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#000000"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EdenPulseDashboard;
