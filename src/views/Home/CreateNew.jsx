import React, { useState, useEffect } from 'react'
import calendar from '../../assets/Logos/calendar.svg'
import Button from '../../components/Button/Button'
import exit from '../../assets/Logos/exit.svg'
import { Input } from '../../components/Input/Input'

export default function CreateNew({ pop, setPop, onCreateNewTask}) {
    const [popclr, setPopclr] = useState("green")
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("0");

    function handleChange(e) {
        const value = e.target.value;
        setPriority(value);
        if (value === "0") {
            setPopclr("green")
        } else if (value === "1") {
            setPopclr("yellow")
        } else if (value === "2") {
            setPopclr("orange")
        } else {
            setPopclr("red")
        }
    }

    function handleSubmit() {
        const data = { title,"status" : 0, priority }; 
        onCreateNewTask(data);
        setTitle("");
        setPop(false);        
        console.log(data);
    }

    function handleExit() {
        setPop(false)
    }
    if (pop) {
        document.body.classList.add('activePop')
    } else {
        document.body.classList.remove('activePop')
    }
    return (
        <>
            {pop &&
                <div className='create'>
                    <div className='overlay'>
                        <div className='create-details'>
                            <div className="create-header">
                                <div className="create-priority">
                                    <select className={popclr} onChange={handleChange}>
                                        <option value="0" style={{ backgroundColor: "#46F7B7" }}>Low priority</option>
                                        <option value="1" style={{ backgroundColor: "#F5EB88" }}>Medium priority</option>
                                        <option value="2" style={{ backgroundColor: "#FFA775" }}>High priority</option>
                                        <option value="3" style={{ backgroundColor: "#F27F77" }}>Highest priority</option>
                                    </select>
                                </div>
                                <Button onClick={handleExit} className={"exit"} label={
                                    <img src={exit} />
                                } />
                            </div>
                            <div className="create-title">
                                <Input id={"create-task"} className={"create-task"} placeholder={"Designate A Task . . . "} value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="create-footer">
                                <div className="create-date">
                                    <img src={calendar} />
                                    <p>10 jan, 2024</p>
                                </div>
                                <Button className={"create-btn"} label={"Submit"} onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}