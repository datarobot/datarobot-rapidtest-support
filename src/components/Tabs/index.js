import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cls from 'classnames';

import './Tabs.css';

const RtTabs = ({ labels = [], panels = [], listClassName }) => (
  <Tabs>
    <TabList className={cls('tab-list', listClassName)}>
      {labels.map((label, i) => (
        <Tab key={i}>{label}</Tab>
      ))}
    </TabList>

    {panels.map((panel, i) => (
      <TabPanel key={i}>{panel}</TabPanel>
    ))}
  </Tabs>
);

export default RtTabs;
