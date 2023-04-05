import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import GroupSetCard from './GroupSetCard';
import Search from './Search';

const GroupSets = ({groupId}) => {
    const [sets, setSets] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [showingSets, setShowingSets] = useState([])
    const { request } = useContext(UserContext)

    useEffect(() => {
        const getSets = async () => {
            const resp = await request(`groups/${groupId}/sets`)
            const groupSets = resp.sets
            setSets(groupSets)
            setShowingSets(groupSets)
        }
        getSets()
    }, [])

    useEffect(() => {
        if (sets){
            const setsToShow = sets.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            setShowingSets(setsToShow)
        }
    }, [searchTerm])
    return (
        <>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} text="Search for group set by name" />
            <div className="NewSetCard">
                <NavLink to={`/groups/${groupId}/sets/new`}>
                    <button className="NewSetButton">+</button>
                    <p className="NewSetText" >Create a new set</p>
                </NavLink>
            </div>
            {sets 
                ?
                sets.length > 0
                    ?
                    <>
                        {showingSets.map(s => <GroupSetCard key={s.id} set={s} groupId={groupId} />)}
                    </>
                    :
                    <h1>No sets yet!</h1>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default GroupSets;