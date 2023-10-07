import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from "./components/layout/admin";
import HomePage from './page/front/HomePage'
import DashboardPage from "./page/admin/DashboardPage"
import SkillsPage from './page/admin/SkillsPage';
import UsersPage from './page/admin/UsersPage';

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path="/" element={<AdminLayout />} >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="skills" element={<SkillsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
