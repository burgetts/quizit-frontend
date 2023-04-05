import React, { useContext } from 'react';
import GroupsTabs from '../components/GroupsTabs';
import UserContext from '../utils/UserContext';

const GroupsPage = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <div className="FlashcardsPage">
            <div className="FlashcardsPage-profile-pic-container">
                <img className="FlashcardsPage-profile-pic" src={currentUser.profilePicture}  alt="profile pic"></img> 
                <span className="FlashcardsPage-username">{currentUser.username}</span>
            </div>
            <GroupsTabs sets={currentUser.sets} />
        </div>
    )
}

export default GroupsPage;