// components/PaginatedIssuesTable.js

import React, { useState, useEffect } from 'react';
import IssuesTable from './IssuesTable';
import { getIssues } from '../utils/data';

const PaginatedIssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchIssues(currentPage);
  }, [currentPage]);

  const fetchIssues = async (page) => {
    try {
      const data = await getIssues(page);
      setIssues(data.issues);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  return (
    <div>
      <IssuesTable issues={issues} />
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedIssuesTable;