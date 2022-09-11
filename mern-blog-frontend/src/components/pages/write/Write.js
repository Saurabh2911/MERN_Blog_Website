import React, { useContext, useState } from 'react'
import './write.css'
import UserContext from '../../../context/user/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write() {
    const host = "http://localhost:5000/api";
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const { user } = context;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }
        
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.photo = fileName;
            
            try {
                await axios.post(`${host}/upload`,data);
            } catch (error) {
            }
        }
       

        try {
            const res = await axios.post(`${host}/posts`,newPost);
            navigate(`/post/${res.data._id}`);
            
        } catch (error) {
        }


    }
    return (
        <div className='write'>
        {
            file && (
                <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
            )
        }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeformGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput' className='writeFile' 
                    onChange={(e) => { setFile(e.target.files[0]) }} />
                    <input type="text" placeholder='Title' className='writeTitle' autoFocus={true}
                        onChange={(e) => { setTitle(e.target.value) }} value={title} />
                </div>
                <div className="writeformGroup">
                    <textarea placeholder='Tell your story' type='text' className='writeText'
                        onChange={(e) => { setDesc(e.target.value) }} value={desc} >
                    </textarea>
                </div>
                <button className="writeSubmit" type='submit'>
                    Publish
                </button>
            </form>
        </div>
    )
}

export default Write