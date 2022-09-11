import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../sidebar/Sidebar'
import UserContext from '../../../context/user/UserContext';
import axios from 'axios';

function Settings() {
    const host = "http://localhost:5000/api";
    const PF = "http://localhost:5000/images/";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const context = useContext(UserContext);
    const { user } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
        }

        if(username){
            updatedUser.username=username;
        }
        if(email){
            updatedUser.email=email;
        }
        if(password){
            updatedUser.password=password;
        }
        
        
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            updatedUser.profilePic = fileName;
            
            try {
                await axios.post(`${host}/upload`,data);
            } catch (error) {
                console.log(error);
            }
        }
       

        try {
            await axios.put(`${host}/users/${user._id}`,updatedUser);  
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }

        


    }
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingtitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle"><i class="settingsDeleteIcon fa-solid fa-trash-can"></i>Delete Account</span>
                </div>


                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                      {
                          file ? <img className='settingsImg' src={URL.createObjectURL(file)} alt="" /> :
                          <img className='settingsImg' src={user.profilePic?(PF + user.profilePic):"https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"} alt="" />
                      }  
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                        </label>
                        <input type="file" id='fileInput' className='settingsFileInput' 
                        onChange={(e) => { setFile(e.target.files[0]) }} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username}  
                    onChange={(e) => { setUsername(e.target.value) }}/>

                    <label>Email</label>
                    <input type="email" placeholder={user.email}
                    onChange={(e) => { setEmail(e.target.value) }} />

                    <label>Password</label>
                    <input type="password"  onChange={(e) => { setPassword(e.target.value) }}/>
                    <button className="settingSumit" type='submit'> update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Settings