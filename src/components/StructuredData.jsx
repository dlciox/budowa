import React from 'react';

function StructuredData({ data }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Osk.BudVip",
  "image": "https://oskbudvip.pl/logo.png",
  "description": "Profesjonalne usługi montażu kuchni, remonty i wykończenia wnętrz w Czeladzi i na Śląsku",
  "@id": "https://oskbudvip.pl",
  "url": "https://oskbudvip.pl",
  "telephone": "+48690112664",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Czeladź",
    "addressLocality": "Czeladź",
    "postalCode": "41-250",
    "addressRegion": "Śląskie",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.3169,
    "longitude": 19.0437
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Czeladź"
    },
    {
      "@type": "City",
      "name": "Będzin"
    },
    {
      "@type": "City",
      "name": "Sosnowiec"
    },
    {
      "@type": "City",
      "name": "Katowice"
    },
    {
      "@type": "State",
      "name": "Śląskie"
    }
  ],
  "sameAs": [
    "https://facebook.com/oskbudvip",
    "https://instagram.com/osk.budvip"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "$$"
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "Osk.BudVip",
    "url": "https://oskbudvip.pl"
  },
  "areaServed": {
    "@type": "State",
    "name": "Śląskie"
  },
  "serviceType": service.type
});

export const generateProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": project.title,
  "image": project.images,
  "description": project.description,
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": project.location,
      "addressRegion": "Śląskie",
      "addressCountry": "PL"
    }
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    }
  }
});

export default StructuredData;