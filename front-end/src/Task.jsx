import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import deleteicon from './assets/deleteicon.png'

function Task(){
    const [status, setstatus] = useState("ADD")
    const [serach, setserach] = useState("")
    const [msg, setmsg] = useState("")
    const[val ,setval] = useState([])
    const url = "http://localhost:3000";
    const[tvalue , settvalue] = useState({
        taskname : "",
        taskid : "",
        startdate : "",
        enddate : "",
        department : "",
        status : "Active",
        des : ""
    });
    const nav = useNavigate(); 
    function AddTask(){
        if (status == "ADD"){ 
            setstatus("Show")
        }
        else if(status == "Show"){
            setstatus("ADD")
            getdata();
        }
    }

    function dataprocess(e){
        let {name , value} = e.target
        settvalue((prev) => ({
            ...prev,
            [name] : value
        }))
        if(name === "taskid" && value !== ""){
            fetch(url + '/checktask/' + value)
            .then((res) => res.json())
            .then((data) => {
                if(data.message == "yes"){
                setmsg("task id already exists!")
                setTimeout(() => {
                    setmsg("")
                }, 2000);
                    
                }
            })
        }

        
    }
    const getdata = () => fetch(url + '/gettask')
        .then((res) => res.json())
        .then((data) => {
            setval(data.data)
        })

    useEffect(() => {
        getdata()
    }, [])

    function sendtask(e){
        e.preventDefault();
        fetch(url + '/addtask', {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(tvalue)
        })
        .then(() => {
            alert("Add Task Sucessfully!")
        })
        .catch(()=>{
            alert("failed!")
        })
    }
    function showtask(t){
        nav(`/Mainview/showtask/${t.taskid}`)
    }
    function taskdel(t){
        fetch(url+'/taskdel/' + t.taskid,{
            method : "delete"
        })
        .then(() =>{
            alert("Deleted sucessfully!")
            getdata();
        })
        .catch(()=>{
            alert("failed!")
        })
    }
    
   
    return(
        <>
            <div className="showheader">
                <h2 className="showheadertxt">Task Details</h2><button className="addbtn" onClick={AddTask}>{status}</button>
                {status == "ADD" ? <><label className="searchlabela">Search:</label><input onChange={(e) => setserach(e.target.value)} className="searchinput" type="text" name="" id="" /> </>: null }
            </div>
            <div className="w-[80vw] h-[70vh]">
                {status == "ADD" ?
                val.filter( t => t.taskname.toLowerCase().includes(serach.toLowerCase())
                )
                .map(t => (
                    <div className="task" onDoubleClick={() => showtask(t)}>
                    <div className="flex flex-row">
                    <div className="w-[72vw] mt-2 py-2 ms-3 text-2xl font-bold" >{t.taskname}</div>
                    <div className="pt-6">
                    <button onClick={()=>taskdel(t)}><img className="w-6" src={deleteicon}/></button>
                    </div>
                    </div>
                    <p className="py-2 ms-3">{t.des}</p>
                    </div>
                    
                ))
                    
                
                    : (
                        <div className="bg-white mt-5 w-[75vw] ms-[5%] h-[70vh] pe-10 overflow-y-auto">
                            <form onSubmit={sendtask} className="grid grid-cols-2">
                                    <div className="form-grp">
                                    <label className="form-grplabel">Task: </label><input onChange={dataprocess} name="taskname" type="text" />
                                    </div>

                                    <div className="form-grp">
                                    <label className="form-grplabel">Task Id: </label>
                                    <div className="flex flex-col">
                                    <input name="taskid" onChange={dataprocess} type="text" />
                                    <p className="text-sm font-medium text-red-600">{msg}</p>
                                    </div>
                                    </div>

                                    <div className="form-grp">
                                    <label>Start Date: </label>
                                    <input onChange={dataprocess}  name="startdate" type="date" />
                                    </div>
                                    

                                    <div className="form-grp">
                                    <label>End Date: </label>
                                    <input onChange={dataprocess} name="enddate" type="date" />
                                    </div>

                                    <div className="form-grp">
                                    <label>Department: </label>
                                    <input onChange={dataprocess} name="department" type="text" />
                                    </div>
                                    
                                    <div className="form-grp">
                                    <label>Status: </label>
                                    <select onChange={dataprocess} name="status">
                                        <option>Active</option>
                                        <option>In Active</option>
                                    </select>
                                    </div>
                                    <div className="form-grp col-span-2">
                                    <label>Discription: </label>
                                    <textarea onChange={dataprocess} name="des" type="text" />
                                    </div>
                                    <button className="submit" type="submit">Submit</button>
                            </form>

                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Task