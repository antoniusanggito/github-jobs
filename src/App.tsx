import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobDetail from './components/JobDetail';
import JobList from './components/JobList';
import Login from './components/Login';
import { AuthProvider } from './components/context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
