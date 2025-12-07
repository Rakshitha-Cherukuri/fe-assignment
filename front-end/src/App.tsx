import { Routes, Route } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import SingleTaskPage from "./pages/SingleTaskPage";
import { TasksProvider } from "./contexts/taskContext";
import { AuthProvider } from "./contexts/authContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import ProfilePage from "./pages/profilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";


function App() {
  return (
    <div>
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/signUp" element={<PublicRoute><SignupPage /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><SingleTaskPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </div>
  );
}

export default App;