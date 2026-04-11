import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadCMSData } from '../services/CMS';
import * as StaticData from '../data';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await loadCMSData();
      if (data) {
        setLiveData(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  // Merge logic: prefer live data from sheets, fallback to static data.js
  const getData = (key, fallback) => {
    if (liveData && liveData[key]) return liveData[key];
    return fallback;
  };

  return (
    <CMSContext.Provider value={{ liveData, loading, getData, StaticData }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
