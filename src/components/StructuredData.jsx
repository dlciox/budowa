import React from 'react';
import { useLocation } from 'react-router-dom';
import { generateStructuredData } from '../utils/seo';

function StructuredData({ pageData }) {
  const location = useLocation();
  const structuredData = generateStructuredData(location.pathname, pageData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

export default StructuredData;