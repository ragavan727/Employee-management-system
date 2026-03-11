import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function UserLogin(){
    const url = "http://localhost:3000";
    const nav = useNavigate();
    const [login, setlogin] = useState([]);
    const [err, seterr] = useState("");

    const [value, setvalues] = useState({
        username : "",
        password : ""
    });

    function setvaluess(e){
        let {name , value} = e.target
        setvalues((prev)=>({
            ...prev,
            [name] : value
        }))
    }

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

    function check(){
        let user = login.find(
            (val) => val.username === value.username && val.password === value.password
        )

        if(user){
            nav('/Mainview');
        }
        else{
            seterr("Username or password is wrong")

            setTimeout(()=>{
                seterr("")
            },2000)
                        
        }
        setvalues({
            username : "",
            password : ""
        })
    }

    return(
        <>
        <div className="bg-slate-50 w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="bg-white w-[30em] h-[20em] shadow-lg">

                <div className="bg-gray-100 flex justify-center items-center">
                    <div className="py-3 text-2xl font-semibold">Login</div>
                </div>

                <div className="flex flex-col ms-10 mt-5"> 
                    <input name="username" onChange={setvaluess}value={value.username} className="bg-slate-100 py-3 w-[20em] mb-4 rounded-md ps-3" placeholder="username" type="text" />
                    <input name="password" onChange={setvaluess} value={value.password} className="bg-slate-100 py-3 w-[20em] mb-4 rounded-md ps-3" placeholder="password" type="password" />
                </div>
                <p className="text-sm ms-10 font-medium text-red-600">{err}</p>

                <div className="flex justify-center items-center">
                    <button onClick={check} className="py-2 w-[10em] mt-8 bg-gray-800 text-white rounded-md">Submit</button>
                </div>

            </div>
        </div>
        </>
    )
}

export default UserLogin