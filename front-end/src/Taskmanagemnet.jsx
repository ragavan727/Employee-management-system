import { useState } from "react"
import { useNavigate } from "react-router-dom"

function TaskManagemnt(){
    const nav = useNavigate(); 
    function handleprogress(value){
        nav(`/Mainview/Assgin/${value}`)
    }
    return(
        <>
            <div className="showheader">
                <h2 className="showheadertxt">Task Details</h2>
                
            </div>
            <div className="w-[80vw] h-[70vh] overflow-y-auto">
                <div className="ms-3 mt-5 ">
                    <div className="progdiv" onDoubleClick={() => handleprogress("To Do")}>
                        <p className="text-2xl pt-3 ps-2 font-semibold" >To Do</p>
                        <p className="text-md pt-3 ps-2 " >Tasks that have been created and scheduled, but work has not yet started.</p>
                    </div>   
                    <div className="progdiv" onDoubleClick={() => handleprogress("In progress")}>
                        <p className="text-2xl pt-3 ps-2 font-semibold" id="In progress">In progress</p>
                        <p className="text-md pt-3 ps-2 " >Tasks that are actively being developed or worked on by the assigned team member.</p>
                    </div>   
                    <div className="progdiv" onDoubleClick={() => handleprogress("Testing")}>
                        <p className="text-2xl pt-3 ps-2 font-semibold">Testing</p>
                        <p className="text-md pt-3 ps-2 " >Tasks that have completed development and are now being verified to ensure they meet requirements and work correctly.</p>
                    </div>   
                    <div className="progdiv" onDoubleClick={() => handleprogress("Completed")}>
                        <p className="text-2xl pt-3 ps-2 font-semibold">Completed</p>
                        <p className="text-md pt-3 ps-2 " >Tasks that have successfully passed testing and are finalized, ready for delivery or deployment.</p>
                    </div>
                </div>   
                    
            </div>
        </>
    )
}

export default TaskManagemnt