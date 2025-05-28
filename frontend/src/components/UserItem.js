import React from 'react';

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <li>
      <div>
        <strong>{user.name}</strong> - {user.email} - {user.age} ans - {user.phone}
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </li>
  );
};

export default UserItem;