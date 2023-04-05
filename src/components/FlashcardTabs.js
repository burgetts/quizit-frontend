import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../css/Tab.css';
import UserSets from './UserSets';
import PublicSets from './PublicSets';

const FlashcardTabs = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <Tabs>
        <TabList>
          <Tab>Your Sets</Tab>
          <Tab>Public Sets</Tab>
        </TabList>
    
        <TabPanel>
          <UserSets searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </TabPanel>
        <TabPanel>
          <PublicSets searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </TabPanel>
      </Tabs>
    )

}

  export default FlashcardTabs