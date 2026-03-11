import { BrowserRouter, Route, Routes } from "react-router-dom"
import Mainview from "./Mainveiw"
import Dashboard from "./Dashboard"
import Employee from "./Employee"
import Task from "./Task"
import TaskManagemnt from "./Taskmanagemnet"
import AssginTask from "./AssignTask"
import Accounts from "./Accouts"
import UserLogin from "./Login"
import Show from "./Showemp"
import Showtask from "./Showtask"
import Showassigntask from "./Showassigntask"
import Changelogin from "./Changelogin"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />}/>
          <Route path="/Mainview" element={<Mainview />}>
          <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Employee" element={<Employee />} />
            <Route path="Task" element={<Task />} />
            <Route path="TaskManagemnt" element={<TaskManagemnt />} />
            <Route path="Accounts" element={<Accounts />} />
            <Route path="changelogin" element={<Changelogin />} />
            <Route path="Assgin/:value" element={<AssginTask/>} />
            <Route path="Show/:id" element={<Show/>} />
            <Route path="showtask/:id" element={<Showtask/>} />
            <Route path="showassign/:id" element={<Showassigntask/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
