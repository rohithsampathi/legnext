// utils/data.js

const API_URL = '/api';

// Helper Function to Sanitize Issue IDs
export const sanitizeIssueId = (issueId) => {
  // Remove any characters after the colon, e.g., "670b9f53e2ab076813df59b5:1" becomes "670b9f53e2ab076813df59b5"
  return issueId.split(':')[0];
};

// Function to Handle API Responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');

  // Check if response is JSON
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      // Extract error message from response
      const errorMsg = data.error || 'An error occurred';
      throw new Error(errorMsg);
    }
    return data;
  } else {
    // If response is not JSON, throw a generic error
    if (!response.ok) {
      throw new Error('An error occurred');
    }
    return null; // or return response.text() if needed
  }
};

// Exported API Functions

// ---------------------- Issue Related Functions ----------------------

// Get All Issues
export const getIssues = () =>
  fetch(`${API_URL}/issues`)
    .then(handleResponse)
    .then((data) =>
      data.map((issue) => ({
        ...issue,
        upvotes: issue.upvotes || 0,
        upvotedBy: issue.upvotedBy || [],
        createdOn: issue.createdOn || new Date().toISOString(),
      }))
    );

// Add a New Issue
export const addIssue = (issueData) =>
  fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issueData),
  }).then(handleResponse);

// Update an Existing Issue
export const updateIssue = (issueId, updateData) => {
  const sanitizedIssueId = sanitizeIssueId(issueId);
  return fetch(`${API_URL}/issues/${sanitizedIssueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  }).then(handleResponse);
};

// Upvote an Issue
export const upvoteIssue = (issueId, username) => {
  const sanitizedIssueId = sanitizeIssueId(issueId);
  return fetch(`${API_URL}/issues/${sanitizedIssueId}/upvote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  }).then(handleResponse);
};

// Close an Issue (Set Status to 'Closed')
export const closeIssue = (issueId) => updateIssue(issueId, { status: 'Closed' });

// Change Issue Status
export const changeIssueStatus = (issueId, status) => {
  const sanitizedIssueId = sanitizeIssueId(issueId);
  return fetch(`${API_URL}/issues/${sanitizedIssueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then(handleResponse);
};

// Delete an Issue
export const deleteIssue = (issueId) => {
  const sanitizedIssueId = sanitizeIssueId(issueId);
  return fetch(`${API_URL}/issues/${encodeURIComponent(sanitizedIssueId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }, // Added Content-Type for consistency
  }).then(handleResponse);
};

// Get Category Counts for Dashboard
export const getCategoryCounts = () =>
  fetch(`${API_URL}/categories/counts`)
    .then(handleResponse)
    .then((data) =>
      data.map((item) => ({
        name: item.name || 'Unknown',
        value: item.value || 0,
      }))
    );

// Get Issue Counts by Status for Dashboard
export const getIssueCounts = () =>
  fetch(`${API_URL}/issues/counts`)
    .then(handleResponse)
    .then((data) =>
      data.map((item) => ({
        name: item.name || 'Unknown',
        value: item.value || 0,
      }))
    );

// ---------------------- Category Related Functions ----------------------

// Get All Categories
export const getCategories = () =>
  fetch(`${API_URL}/categories`)
    .then(handleResponse)
    .then((data) => data.map((category) => category.name || 'Unknown'));

// Add a New Category
export const addCategory = (categoryName) =>
  fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: categoryName }),
  }).then(handleResponse);

// Delete a Category
export const deleteCategory = (categoryName) =>
  fetch(`${API_URL}/categories`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: categoryName }),
  }).then(handleResponse);

// ---------------------- User Related Functions ----------------------

// Get All Users
export const getUsers = () =>
  fetch(`${API_URL}/users`)
    .then(handleResponse)
    .then((data) =>
      data.map((user) => ({
        ...user,
        isAdmin: user.isAdmin || false,
      }))
    );

// Add a New User
export const addUser = (userData) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse);

// Update User Password
export const updateUserPassword = (username, newPassword) => {
  const sanitizedUsername = encodeURIComponent(username);
  return fetch(`${API_URL}/users/${sanitizedUsername}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newPassword }),
  }).then(handleResponse);
};

// Delete a User
export const deleteUser = (username) => {
  const sanitizedUsername = encodeURIComponent(username);
  return fetch(`${API_URL}/users/${sanitizedUsername}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse);
};

// ---------------------- Authentication Function ----------------------

// Authenticate User (Login)
export const authenticateUser = (username, password) =>
  fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);

// ---------------------- Export to CSV ----------------------

// Export Data to CSV
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    throw new Error('No data available to export');
  }

  const csvRows = [];

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  // Loop over the rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
