import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Button from './Button';
import EdenPulseDashboard from './EdenPulseDashboard';
import IssuesTable from './IssuesTable';
import { AuthContext } from '../contexts/AuthContext';
import { getIssues, getUserAnalytics } from '../utils/data';
import Link from 'next/link';
import UserAnalyticsTable from './UserAnalyticsTable';

const DashboardView = ({ activeView }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState('');
  const [userAnalytics, setUserAnalytics] = useState([]);

  const refreshIssues = async () => {
    try {
      const fetchedIssues = await getIssues();
      const filteredIssues = fetchedIssues.filter((issue) => {
        const issueDate = new Date(issue.createdOn);
        return issueDate >= startDate && issueDate <= endDate;
      });
      setIssues(filteredIssues);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
      setError('Failed to fetch issues');
    }
  };

  useEffect(() => {
    refreshIssues();
  }, [startDate, endDate]);

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

    if (user && user.isAdmin) {
      fetchUserAnalytics();
    }
  }, [user]);

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">EdenPulse</h2>
      <EdenPulseDashboard issues={issues} />
    </div>
  );

  const renderIssues = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Issues</h2>
      <IssuesTable issues={issues} refreshIssues={refreshIssues} />
      {!user.isAdmin && (
        <div className="mt-4">
          <Link href="/add-issues">
            <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600">
              Raise New Issue
            </Button>
          </Link>
        </div>
      )}
    </div>
  );

  const renderUserAnalytics = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Analytics</h2>
      <UserAnalyticsTable userAnalytics={userAnalytics} />
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'issues':
        return renderIssues();
      case 'userAnalytics':
        return renderUserAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">
                {user && user.isAdmin ? 'Admin Dashboard' : 'Resident Dashboard'}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full md:w-auto px-2 py-1 border rounded"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full md:w-auto px-2 py-1 border rounded"
                />
              </div>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardView;
