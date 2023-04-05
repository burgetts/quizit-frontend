import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import '../css/UserSets.css';
import SetCard from './SetCard';
import Search from './Search';


const UserSets = ({searchTerm, setSearchTerm}) => {
    const { currentUser } = useContext(UserContext)
    const [sets, setSets] = useState(currentUser.sets)
    const [showingSets, setShowingSets] = useState(sets)   

    useEffect(() => {
        if (sets) {
            const setsToShow = sets.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            setShowingSets(setsToShow)
        }
    }, [searchTerm])
    return (
        <>
            <Search setSearchTerm={setSearchTerm} text={"Search by name"}/>
            <div className="NewSetCard">
                <NavLink to="/flashcards/sets/new">
                    <button className="NewSetButton">+</button>
                    <p className="NewSetText" >Create a new set</p>
                </NavLink>
            </div>
            <div>
                {sets.length === 0 ? 
                <p className="NoNewSets"><i>No sets yet!</i></p>
                :
                <div>
                    {showingSets.map(s => <SetCard key={s.id} set={s} />)}
                </div> }
            </div>
        </>
    )
}

export default UserSets;