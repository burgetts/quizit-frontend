import React from 'react';
import "../css/UserCard.css";

const UserCard = ({user}) => {
    return (
            <div className="UserCard">
                <div>
                    <img className="UserCard-profile-picture" src={user.profilePicture}></img>
                    <p className="UserCard-firstName">{user.username}</p><br/>
                </div>
            </div>
    )
}

export default UserCard;