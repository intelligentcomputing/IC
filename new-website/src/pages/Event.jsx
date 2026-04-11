import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Event() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.EventsData);
  return <ActivityTemplate title="Events" data={data} />;
}
