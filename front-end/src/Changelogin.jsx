import {  useEffect, useState } from "react";

function Changelogin(){
    const url = "http://localhost:3000";
    const [result, setresult] = useState("");
    const [login, setlogin] = useState([]);
    const [value, setvalues] = useState({
        username : "",
        password : ""
    });

    const getlogin = () => {
            fetch(url + '/login')
            .then((res) => res.json())
            .then((data) => {
                setlogin(data.data)
            })
            
        }
    
        useEffect(()=>{
            getlogin();
        }, [])
    

    function setvaluess(e){
        let {name , value} = e.target
        setvalues((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const idd = login[0]?._id 
    function setpass(){
        fetch(url + '/updatelogin/'+ idd,{
            method : "put",
            headers : {
                "Content-Type" : "application/json"  
            },
            body : JSON.stringify(value)
        })
        setresult("Updated sucessfully!!")

            setTimeout(()=>{
                setresult("")
            },1500)
                     

        setvalues({
            username : "",
            password : ""
        })
    }

    
    return(
        <>
        <div className="bg-slate-50 w-[85svw] h-[85vh] flex justify-center items-center">
            <div className="bg-white w-[30em] h-[20em] shadow-lg">

                <div className="bg-gray-700 text-white flex justify-center items-center">
                    <div className="py-3 text-2xl font-semibold">Change Login Details</div>
                </div>

                <div className="flex flex-col ms-10 mt-5"> 
                    <input name="username" onChange={setvaluess}value={value.username} className="bg-slate-100 py-3 w-[20em] mb-4 rounded-md ps-3" placeholder="username" type="text" />
                    <input name="password" onChange={setvaluess} value={value.password} className="bg-slate-100 py-3 w-[20em] mb-4 rounded-md ps-3" placeholder="password" type="password" />
                </div>
                <p className="text-sm ms-10 font-medium text-green-600">{result}</p>
                <div className="flex justify-center items-center">
                    <button onClick={setpass} className="py-2 w-[10em] mt-8 bg-gray-200 text-black rounded-md">Submit</button>
                </div>

            </div>
        </div>
        </>
    )
}

export default Changelogin