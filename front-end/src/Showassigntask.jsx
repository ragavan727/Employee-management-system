import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import editicon from './assets/editicon.png'

function Showassigntask(){
    const {id} = useParams();
    const [uval , setuval] = useState(0);
    const [assin, setassin] = useState([]);
    const url = "http://localhost:3000";
    
    
    const getassign = () => fetch(url + '/getassign')
    .then((res) => res.json())
    .then((data)=> {
        setassin(data.data)
        
    })
    
    useEffect(()=>{
        getassign();
    },[])

    const result = assin.filter(tsk => tsk.taskid == id);
   
    const [values, setvalues] = useState({})

    function dataprocess(e){
        
            let {name , value} = e.target
            setvalues(prev => ({
                ...prev,
                [name] : value
            }))
            
    }
    
    

    function update(){
        if(uval == 0){
            setuval(1)
            setvalues(result[0])
        }
        
    }

    async function up(){
        fetch(url+'/updatassigntask/'+ id,{
            method : "put",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(() => {
            alert("sucessflu updated!")
            
        })
        .catch(()=>{
            alert("update failed!")
        })
        if (uval == 1){
            setuval(0)
        }
        getassign();
        
    }
    
    return (
    <>  <div className="showheader">
                <h2 className="showheadertxt">Employe Details</h2>
                {uval == 0 ? <button onClick={update} className="me-1"><img className="w-6 ms-1" src={editicon}/></button>  : (<button className="addbtn" onClick={update}>Show</button> )}
                
            </div>
            <div className="ms-5 mt-10">
                {result.map(e => (
                        <div className="grid grid-cols-4 gap-5" key={e.taskid}>
                        <div className="sdiv">
                        <label>Employee:</label><br/>
                        {uval == 0 ? <p>{e.assignemp}</p> : (<input className="uinput" value={values.assignemp} onChange={dataprocess} type="text" name="assignemp" />)}
                        </div>

                        <div className="sdiv">
                        <label>Task:</label><br/>
                        {uval == 0 ? <p>{e.task}</p> : (<input className="uinput" value={values.task} onChange={dataprocess} type="text" name="task" />)}
                        </div>

                        <div className="sdiv">
                        <label>Start Date:</label><br/>
                        {uval == 0 ? <p>{e.sdate ? e.sdate.split('T')[0] : ''}</p> : (<input className="uinput" value={values.sdate ? values.sdate.split('T')[0] : ''} onChange={dataprocess} type="date" name="sdate" />)}
                        </div>

                        <div className="sdiv">
                        <label>End Date:</label><br/>
                        {uval == 0 ? <p>{e.edate ? e.edate.split('T')[0] : ''}</p> : (<input className="uinput" value={values.edate ? values.edate.split('T')[0] : ''} onChange={dataprocess} type="date" name="edate" />)}
                        </div>


                        <div className="sdiv">
                        <label>Priority:</label><br/>
                        {uval == 0 ? <p>{e.priority}</p> : (<input className="uinput" value={values.priority} onChange={dataprocess} type="tel" name="priority" />)}
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
export default Showassigntask