import { useParams } from "react-router-dom"
import editicon from './assets/editicon.png' 
import { useEffect, useState } from "react";
function Showtask(){
    const {id} = useParams();
    const [uval, setuval] = useState(0);
    const [val, setval] = useState([]);
    const [values, setvalues] = useState([]);
    const url = "http://localhost:3000";
    const gettask = () => fetch(url + '/gettask')
        .then((res) => res.json())
        .then((data) => {
        setval(data.data)
            })
    

    useEffect(() => {
        gettask();
    }, [])
    
    let result = val.filter(val => val.taskid == id)
    
    
    
    function update(){
        if(uval == 0){
            setuval(1)
            setvalues(result[0])
            
        }
        else{
            setuval(0)
        }
    }

    function dataprocess(e){
        let {name , value} = e.target
            setvalues(prev => ({
                ...prev,
                [name] : value
            }))
    }
    function up(){
   
        fetch(url+'/updatetask/'+ values.taskid,{
            method : "put",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(() => {
            alert("Updated Sucessfully!")
            setuval(0)
            gettask();
        })
        .catch(()=>{
            alert("update failed!")
        })
    }
    
    return(
        <>
        <div className="showheader">
            <h2 className="showheadertxt">Employe Details</h2>
            {uval == 0 ? <button onClick={update} className="me-1"><img className="w-6 ms-1" src={editicon}/></button>  : (<button className="addbtn" onClick={update}>Show</button> )}
        </div>
        <div className="ms-5 mt-10">
        {result.map(e => (
            <div className="grid grid-cols-4 gap-5">
                <div className="sdiv">
                    <label>Taskname:</label><br/>
                    {uval == 0 ? <p>{e.taskname}</p> : (<input className="uinput" value={values.taskname} onChange={dataprocess} type="text" name="taskname" />)}
                </div>
                <div className="sdiv">
                    <label>Taskid:</label><br/>
                    {uval == 0 ? <p>{e.taskid}</p> : (<input className="uinput" value={values.taskid} onChange={dataprocess} type="text" name="taskid" />)}
                </div>
                <div className="sdiv">
                    <label>Start Date:</label><br/>
                    {uval == 0 ? <p>{e.startdate ? e.startdate.split('T')[0] : ''}</p> : (<input className="uinput" value={values.startdate ? values.startdate.split('T')[0] : ''} onChange={dataprocess} type="text" name="startdate" />)}
                </div>
                <div className="sdiv">
                    <label>End Date:</label><br/>
                    {uval == 0 ? <p>{e.enddate ? e.enddate.split('T')[0] : ''}</p> : (<input className="uinput" value={values.enddate ? values.enddate.split('T')[0] : ''} onChange={dataprocess} type="text" name="enddate" />)}
                </div>
                <div className="sdiv">
                    <label>Department:</label><br/>
                    {uval == 0 ? <p>{e.department}</p> : (<input className="uinput" value={values.department} onChange={dataprocess} type="text" name="department" />)}
                </div>
                <div className="sdiv">
                    <label>Status:</label><br/>
                    {uval == 0 ? <p>{e.status}</p> : (<input className="uinput" value={values.status} onChange={dataprocess} type="text" name="status" />)}
                </div>
                <div className="sdiv">
                    <label>Description:</label><br/>
                    {uval == 0 ? <p>{e.des}</p> : (<input className="uinput" value={values.des} onChange={dataprocess} type="text" name="des" />)}
                </div>
            </div>
        ))}
            {uval == 0 ? null : (
                         <button onClick={up} className="submit1" type="submit">Update</button>
                         )}
            
        </div>
        </>
    )
}

export default Showtask