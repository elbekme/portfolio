import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'; 

import AdminLayout from "./components/layout/admin";
import HomePage from './page/front/HomePage'
import DashboardPage from "./page/admin/DashboardPage"
import SkillsPage from './page/admin/SkillsPage';
import UsersPage from './page/admin/UsersPage';
import PortfoliosPage from './page/admin/PortfoliosPage';
import EducationPage from './page/admin/EducationPage';
import ExperiencePage from './page/admin/ExperiencesPage';
import NotFoundPage from './page/admin/NotFoundPage';

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
          <Route path="education" element={<EducationPage/>} />
          <Route path="experiences" element={<ExperiencePage/>} />
        </Route>
        ) : null}
        <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  </BrowserRouter>
}

export default App
