import React, { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
    const [postData, setPostData] = useState([]);


    function fetchData(url = 'http://localhost:3000/posts') {
        fetch(url)
            .then(resp => resp.json())
            .then(data => setPostData(data.data))
            .catch(error => console.error('Errore nel recuperare i post', error));
    }


    const deletePost = (slug) => {
        fetch(`http://localhost:3000/posts/${slug}`, {
            method: 'DELETE',
        })
            .then(() => {

                setPostData(prevData => prevData.filter(post => post.slug !== slug));
            })
            .catch(error => {
                console.error('Errore nell\'eliminare il post', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PostContext.Provider value={{ postData, setPostData, deletePost }}>
            {children}
        </PostContext.Provider>
    );
}
