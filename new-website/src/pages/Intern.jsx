import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Intern() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.InternshipsData);
  return <ActivityTemplate title="Internships" data={data} />;
}
