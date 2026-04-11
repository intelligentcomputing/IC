import Papa from 'papaparse';

// ============================================================================
// GOOGLE SHEETS CMS CONFIGURATION
// ============================================================================
// To link your own spreadsheet:
// 1. Go to File > Share > Publish to web
// 2. Select "Link" and choose "CSV" as the format for each tab.
// 3. Replace the URLs below with your own "Published" CSV Links.

const SHEET_URLS = {
  faculty: localStorage.getItem('gs_faculty') || '',
  mentees: localStorage.getItem('gs_mentees') || '',
  activities: localStorage.getItem('gs_activities') || '',
  research: localStorage.getItem('gs_research') || '',
};

const fetchCSV = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve([]);
      return;
    }
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};

export const loadCMSData = async () => {
  try {
    const [faculty, mentees, activities, research] = await Promise.all([
      fetchCSV(SHEET_URLS.faculty),
      fetchCSV(SHEET_URLS.mentees),
      fetchCSV(SHEET_URLS.activities),
      fetchCSV(SHEET_URLS.research),
    ]);

    return {
      faculty: faculty.length ? faculty : null,
      mentees: mentees.length ? mentees : null,
      activities: activities.length ? activities : null,
      research: research.length ? research : null,
    };
  } catch (error) {
    console.error("CMS Load Error:", error);
    return null;
  }
};

/**
 * Helper to get Sheet URLs from localStorage or defaults
 */
export const updateSheetURL = (key, url) => {
  localStorage.setItem(`gs_${key}`, url);
  window.location.reload();
};
