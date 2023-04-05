import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../utils/UserContext';
import SetCard from './SetCard';
import Search from './Search';

const PublicSets = ({searchTerm, setSearchTerm}) => {
    const [sets, setSets] = useState()
    const [showingSets, setShowingSets] = useState([])
    const { request } = useContext(UserContext)

    useEffect(() => {
        const getPublicSets = async () => {
            const resp = await request(`sets`)
            const sets = resp.sets
            setSets(sets)
            setShowingSets(sets)
        }
        getPublicSets()
    }, [])

    useEffect(() => {
        if (sets) {
            const setsToShow = sets.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            setShowingSets(setsToShow)
        }
    }, [searchTerm])
    return (
        <>
        {sets ? 
            <div>
                <Search setSearchTerm={setSearchTerm} text={"Search by name"}/>
                {showingSets.length === 0 ? <h1>No sets match that name </h1> : showingSets.map(s => <SetCard set={s} key={s.id}/>)}
            </div>
             
            : <h1>Loading...</h1>}
        </>
    )
}

export default PublicSets;