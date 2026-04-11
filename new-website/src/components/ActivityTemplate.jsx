import React from 'react';
import AccordionItem from './AccordionItem';

const ActivityTemplate = ({ title, data }) => {
  // If data is coming from Google Sheets, it might be an array of objects
  // with 'details' and 'paragraphs' as JSON strings or simplified fields.
  // We handle both the static data.js format and the flat Google Sheets format.
  
  const processedData = data.map(item => {
    // If details is already an array, use it (Static data)
    if (Array.isArray(item.details)) return item;
    
    // If it's from Google Sheets (Flat object), we reconstruct it
    const details = [];
    if (item.batch) details.push({ label: 'Batch', value: item.batch });
    if (item.year) details.push({ label: 'Year', value: item.year });
    if (item.students) details.push({ label: 'No of Students', value: item.students });
    if (item.date) details.push({ label: 'Date', value: item.date });
    if (item.presenter) details.push({ label: 'Presenter', value: item.presenter });

    return {
      title: item.title,
      image: item.image || item.img,
      heading: item.heading || item.description,
      details: details,
      paragraphs: item.content ? [item.content] : []
    };
  });

  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <h1 className="section-title">{title}</h1>
      {processedData.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          <div className="visit-grid">
            <img alt={item.title} className="visit-image" src={item.image} />
            <div className="visit-details">
              <h4>{item.heading}</h4>
              {item.details.map((detail, dIdx) => (
                <p key={dIdx}>
                  <strong>{detail.label}:</strong> {detail.value}
                </p>
              ))}
              {item.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
};

export default ActivityTemplate;
