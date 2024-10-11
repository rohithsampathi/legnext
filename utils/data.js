// utils/data.js

const API_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }
  return response.json();
};

export const getIssues = () => fetch(`${API_URL}/issues`).then(handleResponse);

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

export const closeIssue = (issueId) =>
  updateIssue(issueId, { status: 'Closed' });

export const changeIssueStatus = (issueId, status) =>
  updateIssue(issueId, { status });

export const getIssueCountsByStatus = () =>
  fetch(`${API_URL}/issues/counts`).then(handleResponse);

export const getCategories = () =>
  fetch(`${API_URL}/categories`).then(handleResponse);

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

export const getUsers = () => fetch(`${API_URL}/users`).then(handleResponse);

export const addUser = (userData) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
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
  fetch(`${API_URL}/categories/counts`).then(handleResponse);

export const getIssueCounts = () =>
  fetch(`${API_URL}/issues/counts`).then(handleResponse);
