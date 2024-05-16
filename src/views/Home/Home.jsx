import React, { useEffect, useState } from 'react';
import logo from '../../assets/Logos/logo.svg';
import exit from '../../assets/Logos/exit.svg';
import plus from '../../assets/Logos/plus.svg';
import Card from '../Home/Card';
import CreateNew from './CreateNew';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

export default function Home() {
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [complete, setComplete] = useState([]);
    const [pop, setPop] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("https://663a5a501ae792804bef03fe.mockapi.io/todo/todo")
            .then((res) => {
                organizeData(res.data);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };

    const organizeData = (data) => {
        const todoItems = [];
        const inProgressItems = [];
        const completedItems = [];

        data.forEach(item => {
            switch (item.status) {
                case 0:
                    todoItems.push(item);
                    break;
                case 1:
                    inProgressItems.push(item);
                    break;
                case 2:
                    completedItems.push(item);
                    break;
                default:
                    break;
            }
        });

        setTodo(todoItems);
        setProgress(inProgressItems);
        setComplete(completedItems);
    };

    function handleExit() {
        navigate('/');
    }

    function handleAddCard() {
        setPop(true);
    }

    function handleCreateNewTask(data) {
        axios.post(`https://663a5a501ae792804bef03fe.mockapi.io/todo/todo`, data)
            .then(res => {
                console.log("Task created:", res.data);
                fetchData(); 
                setPop(false); 
            })
            .catch(err => {
                console.error("Error creating task:", err);
            });
    }

    function Delete(id) {
        axios.delete(`https://663a5a501ae792804bef03fe.mockapi.io/todo/todo/${id}`)
            .then(res => {
                console.log("deleted");
                fetchData(); 
            })
            .catch(err => {
                console.error("Error");
            });
    }

    function handleStatusChange(itemId, newStatus) {
        axios.put(`https://663a5a501ae792804bef03fe.mockapi.io/todo/todo/${itemId}`, { status: newStatus })
            .then(() => {
                console.log("Status updated successfully");
                fetchData(); 
            })
            .catch(err => {
                console.error("Error updating status:", err);
            });
    }

    return (
        <>
            <div className='home'>
                <div className='home-holder'>
                    <div className='home-header'>
                        <div className="home-logo">
                            <img src={logo} alt="logo" />
                            <h4>DoDo</h4>
                        </div>
                        <Button className={"home-exit"} onClick={handleExit} label={
                            <img src={exit} alt="exit" />
                        } />
                    </div>
                    <div className='home-content'>
                        <div className="container">
                            <h3>TO DO</h3>
                            <Card list={todo} onDelete={Delete} handleStatusChange={handleStatusChange} setTodo={setTodo} setProgress={setProgress} setComplete={setComplete} />
                            <Button onClick={handleAddCard} className='add' label={
                                <>
                                    <img src={plus} alt="plus" />
                                    <p><b>Add another card</b></p>
                                </>
                            } />
                        </div>
                        <div className="container">
                            <h3>IN PROGRESS</h3>
                            <Card list={progress} onDelete={Delete} handleStatusChange={handleStatusChange} setTodo={setTodo} setProgress={setProgress} setComplete={setComplete} />
                        </div>
                        <div className="container">
                            <h3>COMPLETED</h3>
                            <Card list={complete} onDelete={Delete} handleStatusChange={handleStatusChange} setTodo={setTodo} setProgress={setProgress} setComplete={setComplete} />
                        </div>
                    </div>
                </div>
            </div>
            <CreateNew pop={pop} setPop={setPop} handleStatusChange={handleStatusChange} onCreateNewTask={handleCreateNewTask} />
        </>
    )
}
