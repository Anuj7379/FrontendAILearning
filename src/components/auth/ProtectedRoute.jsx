import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import { useAuth } from '../../context/authContext'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();


  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default ProtectedRoute
