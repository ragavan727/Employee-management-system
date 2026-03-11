import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import deleteicon from './assets/deleteicon.png'

function Employee(){
    const nav = useNavigate();
    const [status, setstatus] = useState("ADD")
    const [empdata, setempdata] = useState([])
    const [search, setsearch] = useState("");
    const [msg, setmsg] = useState("");
    const url = "http://localhost:3000";
    const [values, setvalues] = useState({
        username : "",
        userid : "",
        department : "",
        role : "",
        skill : "",
        email : "",
        phone : "",
        place : "",
        join : "",
        status : "Active",
        
    }); 
    
    const fetchd = () => {
        fetch(url+'/getemp')
        .then((res) => (res.json()))
        .then((data) => {
            setempdata(data.datas)
            
        })
    }
    useEffect(() =>{
        fetchd();
    }, [])
    
    
    function dataprocess(e){
        
            let {name , value} = e.target
            setvalues(prev => ({
                ...prev,
                [name] : value
            }))
            
            if(name === "userid" && value !== ""){
            fetch(url + '/checkuser/' + value)
            .then((res) => res.json())
            .then((data) => {
                if(data.message == "yes"){
                setmsg("user id already exists!")
                setTimeout(() => {
                    setmsg("")
                }, 2000);
                    
                }
            })
        
    }
    }

    function showemp(emp){
        nav(`/Mainview/Show/${emp.userid}`)
    }

    function datastore(e){
        e.preventDefault();
        fetch(url+'/addemp',{
            method : "post",
            headers : {
                "content-type" :  "application/json"
            },
            body : JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Added Sucessfully!")
            setvalues({
        username : "",
        userid : "",
        department : "",
        role : "",
        skill : "",
        email : "",
        phone : "",
        place : "",
        join : "",
        status : "Active"
        
    
    })
        })
        .catch(() => {
            alert("Adding failed !")
        })
        
        
    }

    

    function Addemp(){
        if (status == "ADD"){ 
            setstatus("Show")
        }
        else if(status == "Show"){
            setstatus("ADD")
            fetchd();    
        }
    }
    function empdel(id){
        fetch(url+'/deletemp/'+ id,{
            method: "delete",
         })
         .then(() =>{
            alert("Deleted Sucessfully!")
            fetchd();
         })
         .catch(() =>{
            alert("failed!")
         })
         
    }

    return(
        <>
            <div className="showheader">
                <h2 className="showheadertxt">Employe Details</h2><button className="addbtn" onClick={Addemp}>{status}</button>
                <label className="searchlabel">Search:</label><input onChange={(e) => setsearch(e.target.value)} className="searchinput" type="text" name="" id="" />
            </div>
                {status == "ADD" ?
                empdata.filter( emp => emp.username.toLowerCase().includes(search.toLowerCase())
                )
                .map(emp =>(
                   <div className="task" onDoubleClick={() => showemp(emp)} key={emp.userid}>
                    <div className="flex flex-row">
                    <div className="w-[72vw] mt-2 py-2 ms-3 text-2xl font-bold" >{emp.username}</div>
                    <div className="pt-6">
                    <button onClick={()=> {empdel(emp.userid)}}><img className="w-6" src={deleteicon}/></button>
                    </div>
                    </div>
                    <p className="py-2 ms-3">{emp.department}</p>
                    </div>
                ))
                    : (
                        <div className="bg-white mt-5 w-[75vw] ms-[5%] h-[70vh] pe-10 overflow-y-auto">
                            <form onSubmit={datastore} className="grid grid-cols-2" >
                                    <div className="form-grp">
                                    <label className="form-grplabel">Name: </label><input onChange={dataprocess} type="text" value={values.username} name="username" />
                                    </div>

                                    <div className="form-grp">
                                    <label>Userid: </label>
                                    <div className="flex flex-col">
                                    <input onChange={dataprocess}  value={values.userid} type="text" name="userid" />
                                    <p className="text-sm font-medium text-red-600">{msg}</p>
                                    </div>
                                    </div>
                                    

                                    <div className="form-grp">
                                    <label>Department: </label>
                                    <input onChange={dataprocess} type="text" value={values.department} name="department"/>
                                    </div>

                                    <div className="form-grp">
                                    <label>Role: </label>
                                    <input onChange={dataprocess} type="text" value={values.role}name="role"/>
                                    </div>

                                    <div className="form-grp">
                                    <label>Skills: </label>
                                    <input onChange={dataprocess} type="text" value={values.skill} name="skill"/>
                                    </div>

                                    <div className="form-grp">
                                    <label>Email: </label>
                                    <input onChange={dataprocess} type="email" value={values.email} name="email" />
                                    </div>

                                    <div className="form-grp">
                                    <label>Phone: </label>
                                    <input onChange={dataprocess} type="number"  value={values.phone} name="phone" />
                                    </div>
                                    
                                    <div className="form-grp">
                                    <label>Place: </label>
                                    <input onChange={dataprocess} type="text" value={values.place} name="place" />
                                    </div>

                                    <div className="form-grp">
                                    <label>Join Date: </label>
                                    <input onChange={dataprocess} type="date" value={values.join} name="join"/>
                                    </div>

                                    <div className="form-grp">
                                    <label>Status: </label>
                                    <select onChange={dataprocess} name="status" value={values.status}>
                                        <option value="Active">Active</option>
                                        <option value="In Active">In Active</option>
                                    </select>
                                    </div>
                                    <button className="submit" type="submit">Submit</button>
                            </form>

                        </div>
                    )
                }
            
        </>
    )
}

export default Employee