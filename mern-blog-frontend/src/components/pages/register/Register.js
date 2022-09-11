import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'

function Register() {
    const host = "http://localhost:5000/api";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState([])
    const [err2, setErr2] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`${host}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });
            const user = await response.json();

            if (user.errors) {
                setErr(user.errors)
                
            } else if(user._id) {
                console.log(user);
                setUsername("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }
            else{
                setErr2("username already exist")
            }

        } catch (error) {
            console.log(error);

        }


    }
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit} >
                <label >Username</label>
                <input type="text" placeholder='Enter your Username'
                    onChange={(e) => { setUsername(e.target.value) }} value={username} />

                <label >Email</label>
                <input type="email" placeholder='Enter your Email'
                    onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label >Password</label>
                <input type="password" placeholder='Enter your Password'
                    onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <button className="registerButton">Register</button>
            </form>
            <button className="loginButton" type='submit'> <Link to={'/login'}>LOGIN</Link></button>
            {
               err &&  err.map((er)=>( <span className='errors'>* {er.msg}</span>))
            }
            {
                err2 && <span className='errors'> {err2}</span>
            }
             

        </div>
    )
}

export default Register