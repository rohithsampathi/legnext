// components/IssuesTable.js

import React, { useState, useMemo, useContext } from 'react';
import { formatDateTimeIST, calculateIssueAge } from '../utils/dateUtils';
import { Card, CardHeader, CardContent } from './Card';
import Button from './Button';
import Select from './Select';
import Modal from './Modal';
import { upvoteIssue, closeIssue, changeIssueStatus } from '../utils/data';
import { exportToCSV } from '../utils/helpers';
import { AuthContext } from '../contexts/AuthContext';

const IssuesTable = ({ issues, refreshIssues }) => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredIssues = useMemo(() => {
    let filtered = [...issues];

    if (categoryFilter) {
      filtered = filtered.filter((issue) => issue.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((issue) => issue.status === statusFilter);
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue =
          sortConfig.key === 'ageDays'
            ? calculateIssueAge(a.createdOn)
            : a[sortConfig.key];
        const bValue =
          sortConfig.key === 'ageDays'
            ? calculateIssueAge(b.createdOn)
            : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [issues, sortConfig, categoryFilter, statusFilter]);

  const categories = useMemo(() => {
    const allCategories = issues.map((issue) => issue.category);
    return [...new Set(allCategories)];
  }, [issues]);

  const handleUpvote = async (issueId) => {
    await upvoteIssue(issueId, user.username);
    refreshIssues();
  };

  const handleCloseIssue = async (issueId) => {
    if (window.confirm('Are you sure you want to close this issue?')) {
      await closeIssue(issueId);
      refreshIssues();
    }
  };

  const handleStatusChange = async (issueId, status) => {
    await changeIssueStatus(issueId, status);
    refreshIssues();
  };

  const openIssueModal = (issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };

  const handleExport = () => {
    const data = filteredIssues.map((issue) => ({
      Subject: issue.subject,
      Category: issue.category,
      CreatedBy: issue.createdBy,
      Upvotes: issue.upvotes,
      CreatedOn: formatDateTimeIST(issue.createdOn),
      Status: issue.status,
      Age: calculateIssueAge(issue.createdOn),
    }));
    exportToCSV(data, 'issues_export.csv');
  };

  return (
    <Card className="max-w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4">
        <h2 className="text-xl font-semibold mb-4 sm:mb-0">Issues</h2>
        <Button onClick={handleExport} className="w-full sm:w-auto">
          Export to Excel
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                {/* Subject */}
                <th
                  scope="col"
                  className="w-1/3 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                {/* Upvotes */}
                <th
                  scope="col"
                  className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('upvotes')}
                >
                  <div className="flex items-center justify-center">
                    Upvotes
                    {sortConfig.key === 'upvotes' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                {/* Age */}
                <th
                  scope="col"
                  className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ageDays')}
                >
                  <div className="flex items-center justify-center">
                    Age
                    {sortConfig.key === 'ageDays' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                {/* Status */}
                <th
                  scope="col"
                  className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                {/* Actions */}
                <th
                  scope="col"
                  className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
              {/* Filters */}
              <tr>
                <th className="px-4 py-2">
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full"
                  >
                    <option value="">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </Select>
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-normal">
                    <div className="text-sm font-medium text-gray-900">
                      <button
                        onClick={() => openIssueModal(issue)}
                        className="text-primary hover:underline"
                      >
                        {issue.subject}
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Created by {issue.createdBy} in {issue.category}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {issue.upvotes}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {calculateIssueAge(issue.createdOn)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {user.isAdmin ? (
                      <Select
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                        className="w-full text-sm"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Closed">Closed</option>
                      </Select>
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          issue.status === 'Open'
                            ? 'bg-green-100 text-green-800'
                            : issue.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : issue.status === 'On Hold'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {issue.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      {!user.isAdmin &&
                        issue.status !== 'Closed' &&
                        !issue.upvotedBy.includes(user.username) && (
                          <Button
                            onClick={() => handleUpvote(issue._id)}
                            className="bg-primary text-white hover:bg-secondary text-xs"
                          >
                            Upvote
                          </Button>
                        )}
                      {(user.isAdmin || user.username === issue.createdBy) &&
                        issue.status !== 'Closed' && (
                          <Button
                            onClick={() => handleCloseIssue(issue._id)}
                            className="bg-red-500 text-white hover:bg-red-600 text-xs"
                          >
                            Close
                          </Button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Issue Details"
      >
        {selectedIssue && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedIssue.subject}
            </h3>
            <p className="text-gray-600">{selectedIssue.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <span>Created by: {selectedIssue.createdBy}</span>
              <span>Created on: {formatDateTimeIST(selectedIssue.createdOn)}</span>
              <span>Category: {selectedIssue.category}</span>
              <span>Status: {selectedIssue.status}</span>
              <span>Upvotes: {selectedIssue.upvotes}</span>
              <span>Age: {calculateIssueAge(selectedIssue.createdOn)} days</span>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default IssuesTable;
