import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../context/PostContext';

export default function PostsList() {
    const { postData, deletePost } = useContext(PostContext);
    return (
        <ul className="list-group">
            {postData.length > 0 ? (
                postData.map((post) => (
                    <li key={post.slug} className="list-group-item d-flex justify-content-between postCard">
                        <Link to={`/posts/${post.slug}`}>
                            <div>
                                <img src={`http://localhost:3000/imgs/posts/${post.image}`} alt={post.title} />
                                <h5>{post.title}</h5>
                                <p>{post.content}</p>
                                <hr />
                                <p><strong>Tags: </strong>{post.tags && post.tags.length ? post.tags.join(', ') : 'Nessun tag'}</p>
                            </div>
                        </Link>
                        <div>
                            <button className="btn trash" onClick={() => deletePost(post.slug)}>
                                <i className="bi bi-trash"> </i>
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <p>Nessun post trovato</p>
            )}
        </ul>
    );
}
