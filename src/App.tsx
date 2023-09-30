import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobDetail from './components/JobDetail';
import JobList from './components/JobList';
import Login from './components/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/positions" element={<JobList />} />
        <Route path="/positions/:id" element={<JobDetail />} />
      </Routes>
    </>
  );
}

export default App;
