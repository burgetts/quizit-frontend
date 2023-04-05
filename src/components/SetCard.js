import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/SetCard.css';
import UserContext from '../utils/UserContext'

const SetCard = ({set}) => {
    const { currentUser  } = useContext(UserContext)
    
    return (
        <Link className="SetCard-link" to={`/flashcards/sets/${set.id}`}>
        <div className="SetCard">
            
            <div className="SetCard-left">            
                <p className="SetCard-name">{set.name}</p>
                <p className="SetCard-description"><i>{set.description}</i></p>
                <p className="SetCard-date-created">Created {set.dateCreated}</p>
            </div>
            
            <div className="SetCard-right">
                <p className="SetCard-created-by">Created by: {currentUser.username === set.createdBy ? 'you' : set.createdBy}</p>
                <p className="SetCard-hidden"><i>{set.hidden ? 'Private' : 'Public'}</i></p>
            </div>
        </div>
        </Link>
       
    )
}

export default SetCard;