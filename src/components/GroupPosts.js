import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../utils/UserContext';
import Post from './Post';
import NewPostForm from './NewPostForm';

const GroupPosts = ({groupId}) => {
    const { request } = useContext(UserContext)
    const [posts, setPosts] = useState()

    // get all group posts on load
    useEffect(() => {
        const getPosts = async () => {
            const resp = await request(`groups/${groupId}/posts`)
            const posts = resp.posts
            setPosts(posts)
        }
        getPosts()
    }, [])
    return (
        <>
            <NewPostForm groupId={groupId} setPosts={setPosts} posts={posts} />
            {posts 
                ?
                posts.map(p => <Post key={p.id} post={p} setPosts={setPosts} posts={posts} groupId={groupId} />)
                :
                <h1>No posts yet!</h1>
            }
        </>
    )
}

export default GroupPosts;