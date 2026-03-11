import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import editicon from './assets/editicon.png'

function Show(){
    const {id} = useParams();
    const [empd , setempd] = useState([]);
    const [uval , setuval] = useState(0);
    const nav = useNavigate();
    const url = "http://localhost:3000";
    
    
    const fetchdta = () => {
        fetch(url+'/getemp')
        .then((res) => res.json())
        .then((data) =>{
            setempd(data.datas)
        })
        
    }
    
    useEffect(()=>{
        fetchdta();
    },[])

    const result = empd.filter(emp => emp.userid === id);

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
        else{
            setuval(0)
        }
    }

    async function up(){
        fetch(url+'/updatemp/'+ values.userid,{
            method : "put",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(() => {
            alert("Updated sucessfully!")
            setuval(0)
            fetchdta();
        })
        .catch(()=>{
            alert("Update failed !")
        })
        
    }
    
    return (
    <>  <div className="showheader">
                <h2 className="showheadertxt">Employe Details</h2>
                {uval == 0 ? <button onClick={update} className="me-1"><img className="w-6 ms-1" src={editicon}/></button>  : (<button className="addbtn" onClick={update}>Show</button> )}
                
            </div>
            <div className="ms-5 mt-10">
                {result.map(e => (
                        <div className="grid grid-cols-4 gap-5" key={e.userid}>
                        <div className="sdiv">
                        <label>Username:</label><br/>
                        {uval == 0 ? <p>{e.username}</p> : (<input className="uinput" value={values.username} onChange={dataprocess} type="text" name="username" />)}
                        </div>

                        <div className="sdiv">
                        <label>User ID:</label><br/>
                        {uval == 0 ? <p>{e.userid}</p> : (<input className="uinput" value={values.userid} onChange={dataprocess} type="text" name="userid" />)}
                        </div>

                        <div className="sdiv">
                        <label>Email:</label><br/>
                        {uval == 0 ? <p>{e.email}</p> : (<input className="uinput" value={values.email} onChange={dataprocess} type="email" name="email" />)}
                        </div>

                        <div className="sdiv">
                        <label>Department:</label><br/>
                        {uval == 0 ? <p>{e.department}</p> : (<input className="uinput" value={values.department} onChange={dataprocess} type="text" name="department" />)}
                        </div>

                        <div className="sdiv">
                        <label>Place:</label><br/>
                        {uval == 0 ? <p>{e.place}</p> : (<input className="uinput" value={values.place} onChange={dataprocess} type="text" name="place" />)}
                        </div>

                        <div className="sdiv">
                        <label>Status:</label><br/>
                        {uval == 0 ? <p>{e.status}</p> : (<input className="uinput" value={values.status} onChange={dataprocess} type="text" name="status" />)}
                        </div>

                        <div className="sdiv overflow-y-auto">
                        <label>Role:</label><br/>
                        {uval == 0 ? <p>{e.role}</p> : (<input className="uinput" value={values.role} onChange={dataprocess} type="text" name="role" />)}
                        </div>

                        <div className="sdiv">
                        <label>Join Date:</label><br/>
                        {uval == 0 ? <p>{e.join ? e.join.split('T')[0] : ''}</p> : (<input className="uinput" value={values.join ? values.join.split('T')[0] : ''} onChange={dataprocess} type="date" name="join" />)}
                        </div>

                        <div className="sdiv">
                        <label>Phone:</label><br/>
                        {uval == 0 ? <p>{e.phone}</p> : (<input className="uinput" value={values.phone} onChange={dataprocess} type="tel" name="phone" />)}
                        </div>

                        <div className="sdiv">
                        <label>Skill:</label><br/>
                        {uval == 0 ? <p>{e.skill}</p> : (<input className="uinput" value={values.skill} onChange={dataprocess} type="text" name="skill" />)}
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
export default Show