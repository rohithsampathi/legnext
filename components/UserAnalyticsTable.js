import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { getUserAnalytics } from '../utils/data';

const UserAnalyticsTable = () => {
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      try {
        console.log('Fetching user analytics...');
        const data = await getUserAnalytics();
        console.log('User analytics data:', data);
        setUserAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch user analytics:', error);
        setError('Failed to load user analytics');
      }
    };

    fetchUserAnalytics();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...userAnalytics].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setUserAnalytics(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const headers = [
    { label: 'Username', key: 'username' },
    { label: 'Logins', key: 'loginCount' },
    { label: 'Total Duration (hr)', key: 'totalDuration' },
    { label: 'Avg Duration (min)', key: 'avgDuration' },
    { label: 'Issues Raised', key: 'issuesRaised' },
    { label: 'Upvotes Done', key: 'upvotesDone' },
    { label: 'Last Login', key: 'lastLogin' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-primary to-secondary text-white">
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => sortData(header.key)}>
                <div className="flex items-center">
                  {header.label}
                  <span className="ml-1">{getSortIcon(header.key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {userAnalytics.map((user, index) => (
            <tr key={user.username} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.loginCount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.totalDuration.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.avgDuration.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.issuesRaised}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.upvotesDone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.lastLogin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAnalyticsTable;
