import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import '../css/GroupPage.css';
import GroupTabs from '../components/GroupTabs';
import GroupEditCard from '../components/GroupEditCard';

const Group = () => {
    const { id } = useParams()
    const [group, setGroup] = useState()
    const [editMode, setEditMode] = useState(false)
    const { request, currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const currentGroupIds = currentUser.groups.map(g => g.id)

    // get group on page load
    useEffect(() => {
        const getGroup = async () => {
            const resp = await request(`groups/${id}`)
            const group = resp.group
            setGroup(group)
        }
        getGroup()
    }, [])
    
    // leave group
    const leaveGroup = async () => {
        await request(`users/${currentUser.username}/groups/${id}`, {}, "delete")
        const user = await request(`users/${currentUser.username}`)
        setCurrentUser(user.user)
        navigate(`/groups`)

    }
    // delete group
    const deleteGroup = async () => {
        await request(`groups/${id}`, {}, "delete")
        const user = await request(`users/${currentUser.username}`)
        setCurrentUser(user.user)
        navigate(`/groups`)
    }

    // edit group
    const editGroup = async (formData) => {
        const resp = await request(`groups/${id}`, formData, "patch")
        const newGroup = resp.group
        setGroup(newGroup)
        const user = await request(`users/${currentUser.username}`)
        setCurrentUser(user.user)
        setEditMode(false)
    }

    const joinGroup = async () => {
        await request(`users/${currentUser.username}/groups/${group.id}`, {}, "post")
        const user = await request(`users/${currentUser.username}`)
        setCurrentUser(user.user)
    }
    
    return (
        <>
        {group ? 
        <div className="GroupPage">
            {currentGroupIds.includes(group.id) 
            
            ? 
            <>
                {/* Buttons -> edit/delete if group owner, leave group if not */}
                {group.createdBy === currentUser.username 
                    ?
                    <div className="GroupPage-top-buttons">
                        <button className="GroupPage-edit-button" onClick={() => setEditMode(true)}>Edit Group</button>
                        <button className="GroupPage-delete-button" onClick={deleteGroup}>Delete Group</button>
                    </div>
                    :
                    <div className="GroupPage-top-buttons">
                        <button className="GroupPage-leave-button" onClick={leaveGroup}>Leave Group</button>
                    </div>
                }

                {editMode 
                    ? 
                    <GroupEditCard group={group} setEditMode={setEditMode} editGroup={editGroup} />
                    :
                    <div className="GroupPage-top">
                        <img className="GroupPage-group-picture" src={group.groupPicture}></img>
                        <p className="GroupPage-group-name">{group.name}</p>
                        <div className="GroupPage-description"><i>{group.description}</i></div>
                    </div>
                }
      

                {/* Group tabs */}
                <GroupTabs groupId={id}/>
            </>
            :
            <>
                <div className="GroupPage-top">
                    <img className="GroupPage-group-picture" src={group.groupPicture}></img>
                    <p className="GroupPage-group-name">{group.name}</p>
                    <div className="GroupPage-description"><i>{group.description}</i></div>
                </div>
                <button className="GroupPage-join-group" onClick={joinGroup}>Join Group</button>
            </>
            }
        </div>
        : <h1>Loading...</h1>}
        </>

    )
}

export default Group;