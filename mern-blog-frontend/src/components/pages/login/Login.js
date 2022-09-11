import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/user/UserContext'
import './login.css'


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const {user,loginUser} = context;

    const handleSubmit = async(e)=>{
        e.preventDefault();
       await loginUser(username,password);
        //console.log(JSON.parse(localStorage.getItem('user')));
        localStorage.getItem('user') && navigate("/")
    }

    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label >Username</label>
                <input type="text" placeholder='Enter your Username' 
                onChange={(e) => { setUsername(e.target.value) }} value={username} />
                <label >Password</label>
                <input type="password" placeholder='Enter your Password' 
                onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <button className="loginBtn">Login</button>
            </form>
            <button className="registerBtn" type='submit'> <Link to={'/register'}>REGISTER</Link></button>

        </div>
    )
}

export default Login