// utils/data.js

const API_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }
  return response.json();
};

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


export const addIssue = (issueData) =>
  fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issueData),
  }).then(handleResponse);

export const updateIssue = (issueId, updateData) =>
  fetch(`${API_URL}/issues/${issueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  }).then(handleResponse);

export const upvoteIssue = (issueId, username) =>
  fetch(`${API_URL}/issues/${issueId}/upvote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  }).then(handleResponse);

export const deleteIssue = (issueId) =>
  fetch(`${API_URL}/issues/${issueId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse);

export const closeIssue = (issueId) =>
  updateIssue(issueId, { status: 'Closed' });

export const changeIssueStatus = (issueId, status) =>
  fetch(`${API_URL}/issues/${issueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then(handleResponse);

export const getCategories = () =>
  fetch(`${API_URL}/categories`)
    .then(handleResponse)
    .then(data => data.map(category => category.name || 'Unknown'));

export const addCategory = (categoryName) =>
  fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: categoryName }),
  }).then(handleResponse);

export const deleteCategory = (categoryName) =>
  fetch(`${API_URL}/categories`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: categoryName }),
  }).then(handleResponse);

export const getUsers = () =>
  fetch(`${API_URL}/users`)
    .then(handleResponse)
    .then(data => data.map(user => ({
      ...user,
      isAdmin: user.isAdmin || false
    })));

export const addUser = (userData) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse);

export const deleteUser = (userId) =>
  fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
  }).then(handleResponse);

export const updateUserPassword = (username, newPassword) =>
  fetch(`${API_URL}/users/${encodeURIComponent(username)}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newPassword }),
  }).then(handleResponse);

export const authenticateUser = (username, password) =>
  fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);

export const getCategoryCounts = () =>
  fetch(`${API_URL}/categories/counts`)
    .then(handleResponse)
    .then(data => data.map(item => ({
      name: item.name || 'Unknown',
      value: item.value || 0
    })));

export const getIssueCounts = () =>
  fetch(`${API_URL}/issues/counts`)
    .then(handleResponse)
    .then(data => data.map(item => ({
      name: item.name || 'Unknown',
      value: item.value || 0
    })));