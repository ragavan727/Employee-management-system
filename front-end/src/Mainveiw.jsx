import { Link, Outlet } from "react-router-dom"
import setting from './assets/setting.png'
function Mainview(){
    return(
    <>
        <div className="p-5 bg-gray-100">
            <Link className="bg-gray-100" to="/Mainview/changelogin"><img className="w-12" src={setting} alt="setting"/></Link>
        </div>
        <div className="flex" >
            <div className="w-[14vw] h-[90vh] rounded-e-xl bg-gray-800">
                <div className="h-[70vh] text-2xl flex flex-col ms-4 mt-10 ">
                    <Link className="navlink" to="/Mainview/Dashboard">Dashboard</Link>
                    <Link className="navlink" to="/Mainview/Employee">Employee</Link>
                    <Link  className="navlink" to="/Mainview/Task">Task</Link>
                    <Link  className="navlink" to="/Mainview/TaskManagemnt">Task Managemnt</Link>
                </div> 
            </div>
            <div className="w-[84vw] h-[85vh] ms-[15px] mt-[15px] bg-gray-50">
               <Outlet/>
            </div>
        </div>
    </>
    )
}

export default Mainview