import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Work() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.WorkshopsData);
  
  // Filter for Workshops if using a combined sheet
  const filteredData = data.filter(item => 
    !item.category || item.category.toLowerCase().includes('work')
  );

  return <ActivityTemplate title="Workshops" data={filteredData} />;
}
