import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import Validation from '../../components/Validation/Validation'
import { Input } from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import pfp from '../../assets/Images/pfp.svg'
import logo from '../../assets/Logos/logo.svg'
import hide from '../../assets/Logos/Hide.svg'
import xicon from '../../assets/Logos/xicon.svg'
import './SignIn.css'


export default function SignIn({ setAuthenticated }) {
    const navigate = useNavigate();

    localStorage.setItem('email', 'mario@gmail.com');
    localStorage.setItem('password', 'M@rio123');


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Validation,
        onSubmit: (values) => {
            const storedEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');

            if (values.email === storedEmail && values.password === storedPassword) {
                console.log("signed in");
                setAuthenticated(true);
                navigate('/home');
            } else {
                alert('Email or password is incorrect');
            }
        }
    });

    return (

        <div className='holder'>
            <div className='SignIn-logo'>
                <img id='logo' src={logo} />
                <h5>DoDo</h5>
            </div>
            <div className='SignIn'>
                <div className='SignIn-content'>
                    <div className='SignIn-info'>
                        <h2>Sign In</h2>
                        <div className='SignIn-details'>
                            <p id={"email"} className='sub-heading'>Email</p>
                            <span className='err'>{formik.errors.email}</span>
                            <div className='inp-holder'>
                                <Input id={"email"} className={"inp"} onChange={formik.handleChange} placeholder={"anonymus@gmail.com"} value={formik.values.email} /><br />
                                <img src={xicon} />
                            </div>

                            <p className='sub-heading'>Password</p>
                            <span className='err'>{formik.errors.password}</span>
                            <div className='inp-holder'>
                                <Input id={"password"} type={"password"} onChange={formik.handleChange} className={"inp"} placeholder={"••••••••"} value={formik.values.password} /><br />
                                <img id="hide" src={hide} />
                            </div>
                            <Button type={"submit"} className={"inp-btn"} label={"Sign In"} onClick={formik.handleSubmit} />
                        </div>
                    </div>

                </div>
                <div className='SignIn-image'>
                    <img src={pfp} />
                </div>
            </div>
        </div>
    )
}

