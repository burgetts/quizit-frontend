import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GroupPosts from './GroupPosts';
import '../css/Tab.css';
import GroupSets from './GroupSets';
import GroupMembers from './GroupMembers';

const GroupTabs = ({groupId}) => {
    return (
        <Tabs>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Sets</Tab>
          <Tab>Members</Tab>
        </TabList>
    
        <TabPanel>
            <GroupPosts groupId={groupId} />
        </TabPanel>
        <TabPanel>
          <GroupSets groupId={groupId} />
        </TabPanel>
        <TabPanel>
          <GroupMembers groupId={groupId} />
        </TabPanel>
      </Tabs>
    )
}

export default GroupTabs;