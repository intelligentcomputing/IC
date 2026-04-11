import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Industrial() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.IndustrialVisitsData);
  return <ActivityTemplate title="Industrial Visits" data={data} />;
}
