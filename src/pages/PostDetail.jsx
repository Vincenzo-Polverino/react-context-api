import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PostDetail() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:3000/posts/${slug}`)
            .then(response => response.json())
            .then(data => {
                setPost(data.data);
            })
            .catch(error => {
                console.error('Errore nel recuperare il post', error);
            });
    }, [slug]);

    if (!post) {
        return <p>Caricamento post...</p>;
    }

    return (
        <div className="card_detail container">
            <h1>{post.title}</h1>
            <img src={`http://localhost:3000/imgs/posts/${post.image}`} alt={post.title} />
            <p>{post.content}</p>
            <p><strong>Tags:</strong> {post.tags && post.tags.length ? post.tags.join(', ') : 'Nessun tag'}</p>
        </div>
    );
}