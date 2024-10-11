// components/DashboardView.js

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
import { getIssues } from '../utils/data';
import Link from 'next/link';

const DashboardView = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [activeView, setActiveView] = useState('dashboard');

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
    }
  };

  useEffect(() => {
    refreshIssues();
  }, [startDate, endDate]);

  const renderAdminDashboard = () => (
    <div>
      {activeView === 'dashboard' ? (
        <EdenPulseDashboard issues={issues} />
      ) : (
        <IssuesTable issues={issues} refreshIssues={refreshIssues} />
      )}
    </div>
  );

  const renderResidentDashboard = () => (
    <>
      {activeView === 'dashboard' ? (
        <EdenPulseDashboard issues={issues} />
      ) : (
        <IssuesTable issues={issues} refreshIssues={refreshIssues} />
      )}
      <div className="mt-4">
        <Link href="/add-issues">
          <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600">
            Raise New Issue
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeView={activeView} setActiveView={setActiveView} isAdmin={user && user.isAdmin} />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                {user && user.isAdmin
                  ? 'Admin Dashboard'
                  : activeView === 'dashboard'
                  ? 'Eden Pulse Dashboard'
                  : 'Issues'}
              </h1>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="p-2 border rounded w-full md:w-auto"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="p-2 border rounded w-full md:w-auto"
                />
              </div>
            </div>
            {user && user.isAdmin ? renderAdminDashboard() : renderResidentDashboard()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardView;
