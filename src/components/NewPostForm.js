import React, { useContext, useState } from 'react';
import '../css/NewPostForm.css';
import UserContext from '../utils/UserContext';

const NewPostForm = ({groupId, setPosts, posts}) => {
    const { request } = useContext(UserContext)
    const INITIAL_STATE = {
        text: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name] : e.target.value
        }))
    }

    const addPost = async (e) => {
        e.preventDefault()
        const resp = await request(`groups/${groupId}/posts`, formData, "post")
        const newPost = resp.post
        setFormData(INITIAL_STATE) 
        setPosts([newPost, ...posts])
        
    }

    return (
       <>
        <form className="NewPostForm">
            <div>
                <textarea className="NewPostForm-input" type="textarea" name="text" value={formData.text} onChange={handleChange} placeholder="Make a post"></textarea>
            </div>
            <div>
                <button className="NewPostForm-post-button" onClick={addPost}>Post</button>
            </div>
        </form>
       </>
    )
}

export default NewPostForm;