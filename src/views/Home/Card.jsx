import React, { useState } from 'react';
import trash from '../../assets/Logos/Vector.svg';
import Button from '../../components/Button/Button';
import calendar from '../../assets/Logos/calendar.svg';
import dayjs from 'dayjs';
import axios from 'axios';
import './Home.css';

export default function Card({ list, onDelete, onMove}) {   

    const handleStatusChange = (itemId, newStatus) => {
        const parsedStatus = parseInt(newStatus);
        console.log(`Changing status of item ${itemId} to ${parsedStatus}`);
        onMove(itemId,  parsedStatus); 
    };

 

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
                            <select className={"card-btn"} value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                                <option value="0" >To Do</option>
                                <option value="1" >In Progress</option>
                                <option value="2" >Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
