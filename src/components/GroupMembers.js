import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../utils/UserContext';
import UserCard from './UserCard';

const GroupMembers = ({groupId}) => {
    const [members, setMembers] = useState()
    const { request } = useContext(UserContext)

    useEffect(() => {
        const getMembers = async () => {
            const resp = await request(`groups/${groupId}/members`)
            const groupMembers = resp.members
            setMembers(groupMembers)
        }
        getMembers()
    }, [])
    
    return (
        <>
            {members 
                ?
                    <>
                    {members.map(m => <UserCard user={m} />)}
                    </>
                :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default GroupMembers;