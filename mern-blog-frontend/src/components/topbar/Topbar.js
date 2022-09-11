import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user/UserContext';
import './topbar.css'
function Topbar() {
  const PF = "http://localhost:5000/images/";
  const context = useContext(UserContext);
    const {user,setUser} = context;
  const handleLogout = ()=>{
    localStorage.removeItem('user');
    setUser(null)
  }
  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-f"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-linkedin-in"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to={'/'}>HOME</Link>
          </li>
          <li className="topListItem"><Link to={'/'}>ABOUT</Link></li>
          <li className="topListItem"><Link to={'/'}>CONTACT</Link></li>
          <li className="topListItem"><Link to={'/write'}>WRITE</Link></li>
          <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>

        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <Link to={'/setting'}>
            <img className='topImg' src={user.profilePic?(PF + user.profilePic):"https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"} alt="" /></Link>
          ) :
            (
              <ul className='topList'>
                <li className="topListItem">
                  <Link to={'/login'}>LOGIN</Link>
                </li>
                <li className="topListItem">
                  <Link to={'/register'}>REGISTER</Link>
                </li>


              </ul>
            )

        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>

      </div>
    </div>
  )
}

export default Topbar