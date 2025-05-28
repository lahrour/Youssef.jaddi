import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';

const HomePage = () => {
  const navigate = useNavigate();

  const handleUserAdded = () => {
    navigate('/users');
  };

  return (
    <div className="container">
      <h1>Add New User</h1>
      <UserForm onUserAdded={handleUserAdded} />
    </div>
  );
};

export default HomePage;