import React from 'react'
import './header.css'
import p1 from '../../assets/p1.jpg'

function Header() {
    return (
        <div className='header'>
            <div className="headerTitle">
                <div className="headerTitleSm">
                    <span>React & Node</span>
                </div>
                <div className="headerTitleLg">
                    <span>Blog</span>
                </div>
            </div>
            <img className='headerImg' src={p1} alt="" />


        </div>
    )
}

export default Header