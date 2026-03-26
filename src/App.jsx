import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'
import DocumentListPage from './pages/documents/DocumentListPage'
import ProfilePage from './pages/profile/ProfilePage'
import FlashCardListPage from './pages/flashCard/FlashCardListPage'
import FlashCardPage from './pages/flashCard/FlashCardPage'
import QuizzesResultPage from './pages/quizzes/QuizzesResultPage'
import QuizzesTakePage from './pages/quizzes/QuizzesTakePage'
import { useAuth } from './context/authContext'

const App = () => {
  const { isAuthenticated, loading } = useAuth(); 
  if (loading) return <div>Loading...</div>

  return (
    <Router>
      <Routes>

        {/* Root Route */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <RegisterPage />
          }
        />
        {/* protectedRooutes */}

        <Route element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>

        <Route path='/documents/:id' element={<DocumentDetailPage/>}/>
        <Route path='/documents' element={<DocumentListPage/>}/>

        <Route path='/flashcards' element={<FlashCardListPage/>}/>
        <Route path='/documents/:id/flashcards' element={<FlashCardPage/>}/>

        <Route path='/quiz/:quizId/results' element={<QuizzesResultPage/>}/>
        <Route path='/quiz/:quizId' element={<QuizzesTakePage/>}/>

        <Route path='/profile' element={<ProfilePage/>}/>

        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  )
}

export default App;
