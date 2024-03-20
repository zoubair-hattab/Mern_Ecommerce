import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRouter = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRouter;
