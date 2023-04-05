import React, { useContext, useState } from 'react';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';


const Reply = ({reply, groupId, replies, setReplies, postId}) => {
    const { currentUser, request } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false)
    
    const INITIAL_STATE = {
        text: reply.text
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)
    const deleteReply =  async () => {
        await request(`groups/${groupId}/posts/${reply.id}`, {}, "delete")
        const remainingReplies = replies.filter(r => r.id !== reply.id)
        setReplies(remainingReplies)
    }

    const editReply = async () => {
        await request(`groups/${groupId}/posts/${reply.id}`, formData, "patch")
        const resp = await request(`groups/${groupId}/posts/${postId}/replies`)
        const replies = resp.replies
        setReplies(replies)
        setEditMode(!editMode)
    }

    return (
        <div className="Reply">
            <div className="Reply-posted-by">
                <div>{reply.postedBy}</div>
            </div>
            <div className="Reply-date-posted">
                <div>{reply.datePosted}</div>
            </div>
            { editMode 
                ? 
                <div className="Reply-text">
                    <textarea name="text" value={formData.text} onChange={handleChange}></textarea>
                </div>
                :
                <div className="Reply-text">
                    <div>{reply.text}</div>
                </div>
            }

            <div className="Reply-buttons">
                {reply.postedBy === currentUser.username 
                    ? 
                    editMode 
                        ?
                        <>
                            <button className="Reply-save-changes-button" onClick={editReply}>Save Changes</button>
                            <button className="Reply-cancel-changes-button" onClick={() => setEditMode(!editMode)}>Cancel</button>
                            
                        </>
                        :
                        <>
                            <button className="Reply-edit-button" onClick={() => setEditMode(!editMode)}>Edit</button>
                            <button className="Reply-delete-button" onClick={deleteReply}>Delete</button>
                        </>
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default Reply;