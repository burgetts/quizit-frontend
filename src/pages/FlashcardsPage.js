import React, { useContext } from 'react';
import FlashcardTabs from '../components/FlashcardTabs';
import UserContext from '../utils/UserContext';
import "../css/FlashcardsPage.css";

const FlashcardsPage = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <div className="FlashcardsPage">
            <div className="FlashcardsPage-profile-pic-container">
                <img className="FlashcardsPage-profile-pic" src={currentUser.profilePicture}  alt="profile pic"></img> 
                <span className="FlashcardsPage-username">{currentUser.username}</span>
            </div>
            <FlashcardTabs sets={currentUser.sets} />
        </div>
    )
}

export default FlashcardsPage;