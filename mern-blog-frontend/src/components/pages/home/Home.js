import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../header/Header'
import Posts from '../posts/Posts'
import Sidebar from '../sidebar/Sidebar'
import './home.css'

function Home() {
    const host = "http://localhost:5000/api";
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${host}/posts${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const posts = await response.json();
            setPosts(posts);
        }
        fetchPost();
    }, [search])
 
    return (
        <div>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </div>

    )
}

export default Home