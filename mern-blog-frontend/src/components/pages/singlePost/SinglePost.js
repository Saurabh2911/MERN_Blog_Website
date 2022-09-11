import React, { useContext, useEffect, useState } from 'react'
import './singlePost.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import UserContext from '../../../context/user/UserContext';

function SinglePost() {
    const host = "http://localhost:5000/api";
    const PF = "http://localhost:5000/images/";

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { user } = context;

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`${host}/posts/${userId}`);
            setData(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc)
            //.log(res.data);
        }
        fetchPost();
        // eslint-disable-next-line 
    }, [userId])

    const handleDelete = async () => {
        try {
            await axios.delete(`${host}/posts/${userId}`, {
                data: {
                    username: user.username
                }
            });
            navigate("/")
        } catch (error) {

        }
    }

    const handleUpdate = async ()=>{
        try {
            await axios.put(`${host}/posts/${userId}`, {
                    username: user.username,
                    title,
                    desc 
            });
            setUpdateMode(false);
        } catch (error) {

        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                <img src={PF + data.photo} alt="" className="singlePostImg" />


                {updateMode ? 
                   ( <input type="text" value={title} className='singlePostTitleInput' autoFocus
                   onChange={(e)=>setTitle(e.target.value)} />) : 
                    (<h2 className="singlePostTitle" > {title}
                        {data.username === user?.username && 
                            (<div className="singlePostEdit">
                                <i className="singlePostIcon singlePostIconEdit fa-solid fa-pen-to-square"
                                    onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon singlePostDel fa-solid fa-trash-can"
                                    onClick={handleDelete}></i>
                            </div>)
                        }
                    </h2>
                )}
                       <div></div>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author :<Link to={`/?user=${data.username}`}>
                        {data.username}</Link></span>
                    <span className="singlePostDate">{new Date(data.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? <textarea className="singlePostContentInput" value={desc} 
                    onChange={(e)=>setDesc(e.target.value)} rows="6" />
                    :  (
                        <p className="singlePostContent">
                            {desc}
                        </p>
                    )
                }
              {
                  updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>
              } 
            </div>
        </div>
    )
}

export default SinglePost