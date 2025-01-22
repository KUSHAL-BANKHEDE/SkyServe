import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

export default {
  // Register a new user
  registerUser(username, password) {
    return axios.post(`${API_BASE_URL}/register`, { username, password });
  },

  // Upload a file
  uploadFile(userId, file) {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);

    return axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Get user files
  getUserFiles(userId) {
    return axios.get(`${API_BASE_URL}/files/${userId}`);
  },
};
