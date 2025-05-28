import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EditUserForm from './EditUserForm';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleUserUpdated = (updatedUser) => {
    navigate('/users');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit User</h1>
      <EditUserForm user={user} onUserUpdated={handleUserUpdated} />
    </div>
  );
};

export default EditUserPage;