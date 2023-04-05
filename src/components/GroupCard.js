import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/GroupCard.css'

const GroupCard = ({group}) => {
    return (
    <>  
            <Link to={`/groups/${group.id}`}>
            <div className="GroupCard">
                <div className="GroupCard-top">
                    <img className="GroupCard-group-picture" src={group.groupPicture}></img>
                    <p className="GroupCard-name">{group.name}</p>
                </div>
                <div className="GroupCard-bottom">
                    <p className="GroupCard-description"><i>{group.description}</i></p>
                </div>
            </div>
            </Link>
    </>
    )
}

export default GroupCard