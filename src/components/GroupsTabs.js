import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../css/Tab.css';
import UserGroups from './UserGroups';
import PublicGroups from './PublicGroups';

const GroupsTabs = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <Tabs>
        <TabList>
          <Tab>Your Groups</Tab>
          <Tab>Search Groups</Tab>
        </TabList>
    
        <TabPanel>
          <UserGroups searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </TabPanel>
        <TabPanel>
          <PublicGroups searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </TabPanel>
      </Tabs>
    )
}

export default GroupsTabs;