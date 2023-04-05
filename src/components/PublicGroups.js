import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../utils/UserContext';
import GroupCard from './GroupCard';
import Search from './Search';

const PublicGroups = ({searchTerm, setSearchTerm}) => {
    const { request } = useContext(UserContext)
    const [groups, setGroups] = useState()
    const [showingGroups, setShowingGroups] = useState([])

    useEffect(() => {
        const getPublicGroups = async () => {
            const resp = await request(`groups`)
            setGroups(resp.groups)
            setShowingGroups(resp.groups)
        }
        getPublicGroups()
    }, [])

    useEffect(() => {
        if (groups) {
            const groupsToShow = groups.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            setShowingGroups(groupsToShow)
        }
    }, [searchTerm])
    return (
        <>  
            <Search text="Search groups by name" setSearchTerm={setSearchTerm} />
            {groups 
                    ?
                    <div>
                        {showingGroups.map(g => <GroupCard group={g} key={g.id} />)}
                    </div>

                    : 
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default PublicGroups;