import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TasksFormPage from './pages/TasksFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePages from './pages/HomePages';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={ProtectedRoute}> {/* Elemento padre */}
          {/* Rutas privadas */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/add-task" element={<TasksFormPage />} />
            <Route path="/tasks/:id" element={<TasksFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;