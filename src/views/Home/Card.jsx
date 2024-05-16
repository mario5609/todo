import React, {useState} from 'react';
import trash from '../../assets/Logos/Vector.svg';
import Button from '../../components/Button/Button';
import calendar from '../../assets/Logos/calendar.svg';
import dayjs from 'dayjs';
import axios from 'axios'; 
import './Home.css';

export default function Card({ list, onDelete, handleStatusChange, setTodo, setProgress, setComplete }) {    

    function order(priority) {
        switch (priority) {
            case 0:
                return <p className='low'>Low priority</p>;
            case 1:
                return <p className='med'>Medium priority</p>;
            case 2:
                return <p className='high'>High priority</p>;
            case 3:
                return <p className='highest'>Highest Priority</p>;
            default:
                return null;
        }
    };

    const handleChange = (itemId, newStatus) => {
        // Call the parent component's handleStatusChange function
        handleStatusChange(itemId, newStatus);
    
        // Find the updated item
        const updatedItem = list.find(item => item.id === itemId);
        updatedItem.status = parseInt(newStatus); // Update the status of the item
    
        // Remove the item from the current list
        const updatedList = list.filter(item => item.id !== itemId);
    
        // Add the updated item to the new list based on the new status
        switch (newStatus) {
            case '0': // To Do
                setTodo(prevTodo => [...prevTodo.filter(item => item.id !== itemId), updatedItem]);
                break;
            case '1': // In Progress
                setProgress(prevProgress => [...prevProgress.filter(item => item.id !== itemId), updatedItem]);
                break;
            case '2': // Completed
                setComplete(prevComplete => [...prevComplete.filter(item => item.id !== itemId), updatedItem]);
                break;
            default:
                break;
        }
    };
    

    return (
        <>
            {list.map(item => (
                <div className='card-holder' key={item.id}>
                    <div key={item.id} className="card">
                        <div className="card-header">
                            <div className="priority">
                                {order(item.priority)}
                                <Button onClick={() => onDelete(item.id)} className={"trash"} label={<img src={trash} alt="trash" />} />
                            </div>
                        </div>
                        <div className="card-content">
                            <p>{item.title}</p>
                        </div>
                        <div className="card-footer">
                            <div className="card-date">
                                <img src={calendar} alt="calendar" />
                                <p className='card-cal'>{dayjs(item.createdAt).format('MMMM D, YYYY')}</p>
                            </div>
                            <select className={"card-btn"} value={item.status} onChange={(e) => handleChange(item.id, e.target.value)}>
                                <option value="0" >To Do</option>
                                <option value="1" >Progress</option>
                                <option value="2" >Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
