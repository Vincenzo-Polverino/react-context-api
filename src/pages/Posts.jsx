import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import PostsList from '../components/PostsList';

export default function Posts() {
    const { postData, setPostData } = useContext(PostContext);
    const [newPost, setNewPost] = useState({
        title: '',
        slug: '',
        image: '',
        content: '',
        tags: [],
        published: false
    });
    const [showForm, setShowForm] = useState(false);


    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'tags') {

            const tagsArray = value ? value.split(',').map(tag => tag.trim()) : [];
            setNewPost((prevState) => ({
                ...prevState,
                [name]: tagsArray
            }));
        } else {
            setNewPost((prevState) => ({
                ...prevState,
                [name]: value
            }));


            if (name === 'title') {
                setNewPost((prevState) => ({
                    ...prevState,
                    slug: generateSlug(value)
                }));
            }
        }
    };


    const addPost = (e) => {
        e.preventDefault();


        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then((response) => response.json())
            .then((data) => {

                setPostData((prevData) => [...prevData, data.data]);

                setNewPost({
                    title: '',
                    slug: '',
                    image: '',
                    content: '',
                    tags: [],
                    published: false
                });

                setShowForm(false);
            })
            .catch((error) => {
                console.error('Errore nell\'aggiungere il post', error);
            });
    };

    return (
        <div>
            <div className="input-group mb-3 d-flex align-items-center">
                <h2>Posts</h2>
                <div className="d-flex">
                    <button className="btn" onClick={() => setShowForm(!showForm)}>
                        Aggiungi
                    </button>
                </div>
            </div>


            {showForm && (
                <div className="modal-form">
                    <h3>Aggiungi un nuovo post</h3>
                    <form onSubmit={addPost}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><strong>Titolo</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="title"
                                value={newPost.title}
                                onChange={handleChange}
                                placeholder="Inserisci il titolo del post"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label"><strong>Immagine</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                id="image"
                                value={newPost.image}
                                onChange={handleChange}
                                placeholder="URL immagine"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label"><strong>Contenuto</strong></label>
                            <textarea
                                className="form-control"
                                name="content"
                                id="content"
                                rows="5"
                                value={newPost.content}
                                onChange={handleChange}
                                placeholder="Inserisci il contenuto del post"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label"><strong>Tags</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="tags"
                                id="tags"
                                value={newPost.tags.join(', ')}
                                onChange={handleChange}
                                placeholder="Inserisci i tag (separati dalla virgola)"
                            />
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="published"
                                id="published"
                                checked={newPost.published}
                                onChange={(e) => setNewPost((prevState) => ({
                                    ...prevState,
                                    published: e.target.checked
                                }))}
                            />
                            <label className="form-check-label" htmlFor="published"><strong>Pubblicato</strong></label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Invia
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                            Annulla
                        </button>
                    </form>
                </div>
            )}

            <PostsList />
        </div>
    );
}
