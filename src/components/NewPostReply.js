import React, { useContext } from 'react';
import { useFields } from '../utils/hooks';
import UserContext from '../utils/UserContext';

const NewPostReply = ({newReplyMode, setNewReplyMode, replies, setReplies, groupId, postId}) => {
    const { request } = useContext(UserContext)
    const INITIAL_STATE = {
        newReplyText: '',
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)

    // on submit, add reply to database and update replies from Post
    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await request(`groups/${groupId}/posts`, {text: formData.newReplyText, replyTo: postId}, "post")
        console.log(resp.post)
        const newReply = resp.post
        setReplies ([...replies, newReply])
        setNewReplyMode(!newReplyMode)
    }
   
    return (
        <>
        {newReplyMode 
            ? 
            <div className="NewReply">
                <div className="NewReply-text">
                    <textarea value={formData.newReplyText} onChange={handleChange} name="newReplyText"></textarea>
                </div>
                <div className="NewReply-buttons">
                    <button className="NewReply-post-button" onClick={handleSubmit}>Post</button>
                    <button className="NewReply-cancel-button" onClick={() => setNewReplyMode(!newReplyMode)}>Cancel</button>
                </div>
            </div>
            : 
            ''
        }
        </>
    )
}

export default NewPostReply;