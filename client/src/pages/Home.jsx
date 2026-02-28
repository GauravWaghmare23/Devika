import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
    </div>
  );
};

export default Home;