import { useEffect, useState } from "react";

function Dashboard(){

const [data,setdata] = useState({});

const url = "http://localhost:3000";

useEffect(()=>{

fetch(url+"/totemp")
.then(res=>res.json())
.then(emp=>{

setdata(prev=>({...prev,...emp}));

});

fetch(url+"/taskstats")
.then(res=>res.json())
.then(task=>{

setdata(prev=>({...prev,...task}));

});

fetch(url+"/todaysubmit")
.then(res=>res.json())
.then(today=>{

setdata(prev=>({...prev,...today}));

});

fetch(url+"/topemployee")
.then(res=>res.json())
.then(top=>{

setdata(prev=>({...prev, topemployee: top[0]?._id , topcount: top[0]?.count}));

});

},[]);

    return (
        <>
            <div className="showheader">
            <h2 className="showheadertxt">Dashboard</h2>
            </div>

            <div className="bg-white ms-4 mt-4 w-[75vw] grid grid-cols-4 gap-5">

                <div className="dashdiv bg-indigo-300">
                    <div>Total Employees</div>    
                    <div>{data.empcount}</div>
                </div>

                <div className="dashdiv bg-blue-200">
                    <div>Total Department</div>    
                    <div>{data.depcount}</div>    
                </div>

                <div className="dashdiv bg-blue-200">
                    <div>Total Task</div>    
                    <div>{data.activeTasks}</div>    
                </div>

                <div className="dashdiv bg-stone-200">
                    <div>To Do Task</div>    
                    <div>{data.todo}</div>    
                </div>

                <div className="dashdiv bg-slate-200">
                    <div>Completed Task</div>    
                    <div>{data.completed}</div>    
                </div>

                <div className="dashdiv bg-red-100">
                    <div>Task Submitted Today</div>    
                    <div>{data.todaysubmit}</div>    
                </div>

                <div className="dashdiv bg-purple-200">
                    <div>In Progress Task</div>    
                    <div>{data.inprogress}</div>    
                </div>

                <div className="dashdiv bg-emerald-200">
                    <div>Task under Test</div>    
                    <div>{data.testing}</div>    
                </div>

                <div className="dashdiv bg-cyan-100">
                    <div>Best Performer</div>    
                    <div>{data.topemployee}</div>    
                </div>

            </div>
                </>
    )
}

export  default Dashboard