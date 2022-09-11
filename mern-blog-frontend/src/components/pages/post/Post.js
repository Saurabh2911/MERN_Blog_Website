import React from 'react'
import './post.css'
import p2 from '../../../assets/p2.jpg'
import { Link } from 'react-router-dom'

function Post({ post }) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
      <img className='postImg' src={PF + post.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postcat" key={c}>{c}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <p className="postDesc">
          {post.desc}</p>
      </div>
    </div>
  );
}

export default Post; 