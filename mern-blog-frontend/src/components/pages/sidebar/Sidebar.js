import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import UserContext from '../../../context/user/UserContext';

function Sidebar() {
    const [cats, setCats] = useState([]);
    const host = "http://localhost:5000/api";
    const PF = "http://localhost:5000/images/";

    const context = useContext(UserContext);
    const { user } = context;


    useEffect(() => {
     const fetchCats = async () => {
            const res = await axios.get(`${host}/categories`);
            setCats(res.data);
        }
        fetchCats();
      // eslint-disable-next-line 
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className='sidebarImg' src={user?.profilePic?(PF + user.profilePic):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9pszu5sKKHLZGfxcN0fxd2nvTTEOkE_OJrA&usqp=CAU"} alt="avatar" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis doloremque molestias consequuntur sequi ad reprehenderit porro iste, dolorum voluptate!</p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                {
                    cats.map((c)=>(

                    <li className="sidebarListItem" key={c._id}>
                    <Link to={`/?cat=${c.name}`}>{c.name}</Link> 
                    </li>
                    ))
                }
                </ul>

            </div>

            <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-facebook-f"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-brands fa-linkedin-in"></i>
            </div>
        </div>
        </div>
    )
}

export default Sidebar