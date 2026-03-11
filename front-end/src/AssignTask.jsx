import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import deleteicon from './assets/deleteicon.png'
import editicon from './assets/editicon.png'
function AssginTask(){
    let {value} = useParams();
    const [tasks , settasks] = useState([]);
    const [state, setstate] = useState(0);
    const [search, setsearch] = useState("");
    const [status, setstatus] = useState();
    const [next, setnext] = useState("");
    const [task, settask] = useState("");
    const nav = useNavigate();    
    const [data, setdata] = useState({
        assignemp : "",
        task : "",
        sdate : "",
        edate : "",
        priority : "Low",
        position : "To Do",
        des : "",
        taskid : "",    
            
    });
    
    const url = "http://localhost:3000";
    
    const getassign = () => fetch(url + '/getassign')
    .then((res) => res.json())
    .then((data)=> {
        setassin(data.data)
        
    })
    const gettask = () => fetch(url+'/gettask')
    .then((res) => res.json())
    .then((data) => {
                settasks(data.data)
                })
            .catch(() =>{

            })
       
    
        useEffect(() => {
            gettask();
            getassign();
        }, [])

    let result = tasks.filter((task) => task.position == value)

    function stask(){
        
        if((state == 1)){
            setstate(0)
            gettask();
        }
    }

    function addtask(tak){
     if(tak.position == "To Do"){   
        settask(tak.taskname)
        setdata(prev => ({
        ...prev,
        task: tak.taskname,
        taskid: tak.taskid
    }))
    if (state == 0){
            setstate(1)
        }
        
    }
    else if (tak.position == "In progress"){
        if (next !=="inprogress"){
            setnext("inprogress")
        }
        
    }
    else if (tak.position == "Testing"){
        if (next !=="Testing"){
            setnext("Testing")
        }
    }
    }
    function dataproces(e){
        let {name , value} = e.target
        setdata((prev)=>({
            ...prev, 
            [name] : value
    }))
    }
    function assign(e){
        e.preventDefault();
        fetch(url+'/assgnintask',{
            method : "post",
            headers : {
                "Content-Type" :  "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(()=>{
            alert("Assign Sucessfully!")
            setstate(0)
            gettask();
        })
        .catch(()=>{
            alert("failed!")
        })
        if (data.position !== "To Do"){
            fetch(url+'/update-status/' + data.taskid,{
            method : "put",
            headers : {
                "Content-Type" :  "application/json"
            },
            body : JSON.stringify(data)
        })    
        }
    }
    function changepos(id, position){
        fetch(url+'/update-status/' + id,{
            method : "put",
            headers : {
                "Content-Type" :  "application/json"
            },
            body : JSON.stringify({position})
        }) 
        .then(()=>{
            alert("passing sucessfully!")
            gettask();
        })
        .catch(()=>{
            alert("passing failed!")
        })

        if (position == "To Do"){
        fetch(url+'/delassign/' + id,{
            method : "delete"
        })
        .then(()=>{
            alert("Delete sucessfully!")
            gettask();
        })
        .catch(()=>{
            alert("failed!")
        })
        }
    }

    function deletetask(tid){
        fetch(url+'/taskdel/' + tid,{
            method : "delete"
        })
        .then(()=>{
            alert("Deleted sucessfully!")
        })
        .catch(()=>{
            alert("failed!")
        })
        
    }

    function showassigntask(id){
        nav(`/Mainview/showassign/${id}`)   
    }
    return( 
    <>
       <div className="showheader">
               { state == 0 ? <h2 className="showheadertxt">{value}</h2> : (<><h2 className="showheadertxt">{value}</h2><button className="addbtn" onClick={stask}>show</button></>) }
          {state == 0 ? <> <label className="searchlabel2">Search:</label><input onChange={(e)=> setsearch(e.target.value)} className="searchinput" type="text" name="" id="" /> </> : null} 
            </div>
        
        <div className="w-[80vw] h-[70vh]">
        {state == 0 ?
        result.filter( tak => tak.taskname.toLowerCase().includes(search.toLowerCase())
                )
        .map(tak => (
             <div className="task" key={tak.taskid} onDoubleClick={() => addtask(tak)}>
                <p className="py-2 ms-3 text-2xl font-bold" >{tak.taskname}</p>
                <p className="py-2 ms-3">{tak.des}</p>
                {next !== "inprogress" ? null : <div className="flex flex-row"><div className="pb-2 ms-1 w-[72vw]"><input className="ms-2 pb-2" value="To Do" type="radio" name={"choose"+ tak.taskid}  onChange={(e) => setstatus(e.target.value)} id="" /><label>To Do</label> <input className="ms-2 mb-1" value="Testing" type="radio" name={"choose"+ tak.taskid}  onChange={(e) => setstatus(e.target.value)}  id="" /><label>Testing</label> <button onClick={() => changepos(tak.taskid, status)} className="radiobtn">submit</button></div><div><button onClick={()=>showassigntask(tak.taskid)} className="me-1"><img className="w-6 ms-1" src={editicon}/></button><button onClick={()=> deletetask(tak.taskid)}><img className="w-6" src={deleteicon}/></button></div></div>}
                {next !== "Testing" ? null : <div className="flex flex-row"><div className="pb-2 ms-1 w-[72vw]"><input className="ms-2 pb-2" value="In progress" type="radio" name={"choose"+ tak.taskid}  onChange={(e) => setstatus(e.target.value)} id="" /><label>In progress</label> <input className="ms-2 mb-1" value="Completed" type="radio" name={"choose"+ tak.taskid}  onChange={(e) => setstatus(e.target.value)}  id="" /><label>Completed</label> <button onClick={() => changepos(tak.taskid, status)} className="radiobtn">submit</button></div><div><button onClick={()=>showassigntask(tak.taskid)} className="me-1"><img className="w-6 ms-1" src={editicon}/></button><button onClick={()=> deletetask(tak.taskid)}><img className="w-6" src={deleteicon}/></button></div></div>}
            </div>
        ))
            : (
                <div className=" bg-white mt-5 w-[75vw] ms-[5%] h-[70vh] pe-10 overflow-y-auto">
                            <form className="grid grid-cols-2" onSubmit={assign}>
                                   
                                    <div className="form-grp">
                                    <label className="form-grplabel">Assgin to: </label><input onChange={dataproces} name="assignemp" type="text" />
                                    </div>

                                    <div className="form-grp">
                                    <label>task: </label>
                                    <input type="text" onChange={dataproces} name="task" value={task} readOnly />
                                    </div>
                                    
                                    <div className="form-grp">
                                    <label>Start Date: </label>
                                    <input type="date"  name="sdate" onChange={dataproces}/>
                                    </div>

                                    <div className="form-grp">
                                    <label>End Date: </label>
                                    <input type="date" name="edate" onChange={dataproces}/>
                                    </div>

                                    <div className="form-grp">
                                    <label className="form-grplabel">Priority: </label>
                                    <select onChange={dataproces} name="priority">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                    </div>

                                    <div className="form-grp">
                                    <label>Status: </label>
                                    <select onChange={dataproces} name="position">
                                        <option>To DO</option>
                                        <option>In progress</option>
                                    </select>
                                    </div>
                                    
                                    <div className="form-grp col-span-2">
                                    <label>Discription: </label>
                                    <textarea type="text" onChange={dataproces} name="des"/>
                                    </div>
                                    <input type="text" hidden  onChange={dataproces} value={data.taskid} name="taskid"/>
                                    <button className="submit" type="submit">Submit</button>
                            </form>

                        </div>
            )}
        </div>
        
    </>
    )
}
export default AssginTask