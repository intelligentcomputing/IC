import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Conference() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.ConferenceData);
  return <ActivityTemplate title="Conference" data={data} />;
}
