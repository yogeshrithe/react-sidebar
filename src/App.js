import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Lead from './pages/leads/Leads'
import MultiActionAreaCard from './pages/Dashboard';
import AddLead from './pages/leads/addLeads'
import Employee from './pages/employees/employee'
import AddEmployee from './pages/employees/addEmployee';
import Roles from './pages/roles/roles';
import AddRole from './pages/roles/addRole'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route index element={<MultiActionAreaCard />} />
                    <Route path='/leads' element={<Lead />} />
                    <Route path='/employees' element={<Employee />} />
                    <Route path='/roles' element={<Roles />} />
                    <Route path='/addLeads' element={<AddLead/>}/>
                    <Route path='/addEmployee' element={<AddEmployee/>}/>
                    <Route path='/addRoles' element={<AddRole/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
