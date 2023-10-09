import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'; 

import AdminLayout from "./components/layout/admin";
import HomePage from './page/front/HomePage'
import DashboardPage from "./page/admin/DashboardPage"
import SkillsPage from './page/admin/SkillsPage';
import UsersPage from './page/admin/UsersPage';
import PortfoliosPage from './page/admin/PortfoliosPage';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={isAuthenticated ? <Navigate to="/dashboard"/> : <HomePage />}/>

      {isAuthenticated ? (
        <Route path="/" element={<AdminLayout />} >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="portfolios" element={<PortfoliosPage />} />
          <Route path="skills" element={<SkillsPage />} />
        </Route>
        ) : null}
        <Route path='*' element={<Navigate to="/" />}/>
    </Routes>
  </BrowserRouter>
}

export default App
