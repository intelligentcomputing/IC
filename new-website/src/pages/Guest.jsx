import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import { useCMS } from '../context/CMSContext';

export default function Guest() {
  const { getData, StaticData } = useCMS();
  const data = getData('activities', StaticData.GuestLecturesData);
  return <ActivityTemplate title="Guest Lectures" data={data} />;
}
