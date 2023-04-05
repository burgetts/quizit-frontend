import React, { useContext, useState, useEffect } from 'react';
import '../css/Post.css';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';
import Reply from './Reply';
import NewPostReply from './NewPostReply';


const Post = ({post, groupId, posts, setPosts}) => {
    const { currentUser, request } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false)
    const [replies, setReplies] = useState()
    const [newReplyMode, setNewReplyMode] = useState(false)
    
    const INITIAL_STATE = {
        text: post.text
    }
    const [formData, handleChange] =  useFields(INITIAL_STATE)
    const deletePost = async () => {
        await request(`groups/${groupId}/posts/${post.id}`, {}, "delete")
        const remainingPosts = posts.filter(p => p.id !== post.id)
        setPosts(remainingPosts)
    }

    const editPost = async () => {
        await request(`groups/${groupId}/posts/${post.id}`, formData, "patch")
        const resp = await request(`groups/${groupId}/posts`)
        const newPosts = resp.posts
        setPosts(newPosts)
        setEditMode(!editMode)
    }

    // get a post's replies and map them into a reply component
    useEffect(() => {
        const getReplies = async () => {
            const resp = await request(`groups/${groupId}/posts/${post.id}/replies`)
            const replies = resp.replies
            setReplies(replies)
        }
        getReplies()
    }, [])

    return (
        <>
        <div className="Post">
            <div className="Post-posted-by">
                <div>{post.postedBy}</div>
            </div>
            <div className="Post-date-posted">
                <div >{post.datePosted}</div>
            </div>
    
            {editMode 
                ?
                <div className="Post-text">
                    <textarea value={formData.text} name="text" onChange={handleChange}></textarea>
                </div>
                :
                <div className="Post-text">
                    <div>{post.text}</div>
                </div>
            }

            {post.postedBy === currentUser.username 
                ?
                editMode 
                    ?
                    <div>
                        <button className="Post-save-changes-button" onClick={editPost}>Save Changes</button>
                        <button className="Post-cancel-changes-button" onClick={() => setEditMode(!editMode)}>Cancel</button>
                    </div>
                    :
                    <div>
                        <button className="Post-edit-button" onClick={() => setEditMode(!editMode)}>Edit</button>
                        <button className="Post-delete-button" onClick={deletePost}>Delete</button>
                        <button className="Post-edit-button" onClick={() => setNewReplyMode(!newReplyMode)}>Reply</button>
                    </div>
                :
                <div className="Post-reply-button">
                    <button onClick={() => setNewReplyMode(!newReplyMode)}>Reply</button>
                </div>
            }

            
        </div>
        
        {replies && replies.length > 0 && replies.map(r => <Reply reply={r} groupId={groupId} setReplies={setReplies} replies={replies} postId={post.id} />)}
        <NewPostReply newReplyMode={newReplyMode} setNewReplyMode={setNewReplyMode} replies={replies} setReplies={setReplies} groupId={groupId} postId={post.id} />
        </>
    )
}

export default Post