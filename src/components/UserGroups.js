import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GroupCard from './GroupCard';
import UserContext from '../utils/UserContext';
import Search from './Search';

const UserGroups = ({searchTerm, setSearchTerm}) => {
    const { currentUser } = useContext(UserContext)
    const groups = currentUser.groups
    const [showingGroups, setShowingGroups] = useState([])

    useEffect(() => {
        if (groups) {
            const groupsToShow = groups.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            setShowingGroups(groupsToShow)
        }
    }, [searchTerm])

    return (
        <>
            <Search text="Search groups by name" setSearchTerm={setSearchTerm} />
            <div className="NewSetCard">
                <NavLink to="/groups/new">
                    <button className="NewSetButton">+</button>
                    <p className="NewSetText" >Create a new group</p>
                </NavLink>
            </div>
            <div>
                {showingGroups.map(g => <GroupCard group={g} key={g.id}/>)}
            </div>
        </>
    )
}

export default UserGroups;