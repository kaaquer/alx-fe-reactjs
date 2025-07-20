import React, { useContext } from 'react';
import UserContext from '../Contexts/UserContext';

const UserProfile = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;