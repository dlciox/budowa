import React, { useState, useEffect } from 'react';
import { calculateRelevanceScore } from '../utils/seo';

function SearchOptimizer({ items, onResultsChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedItems, setSortedItems] = useState(items);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSortedItems(items);
      onResultsChange(items);
      return;
    }

    const scored = items.map(item => ({
      ...item,
      score: calculateRelevanceScore(item, searchTerm)
    }));

    const sorted = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ score, ...item }) => item);

    setSortedItems(sorted);
    onResultsChange(sorted);
  }, [searchTerm, items]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="search"
        placeholder="Szukaj realizacji..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Wyszukiwarka realizacji"
      />
    </div>
  );
}

export const generateSearchOptimizedContent = (content, location = 'Czeladź') => {
  const locationKeywords = [
    'Czeladź',
    'Będzin',
    'Sosnowiec',
    'Dąbrowa Górnicza',
    'Katowice',
    'Śląsk'
  ];

  const serviceKeywords = [
    'montaż kuchni',
    'remont łazienki',
    'wykończenia wnętrz',
    'remont mieszkania',
    'przeprowadzki',
    'meble na wymiar',
    'kompleksowe remonty',
    'montaż mebli'
  ];

  // Combine main content with location-specific variations
  const optimizedContent = locationKeywords.reduce((acc, loc) => {
    const localContent = serviceKeywords.map(service => 
      `${service} ${loc}, ${service} w ${loc}, ${service} na ${loc === 'Śląsk' ? 'Śląsku' : loc}`
    ).join(', ');
    return `${acc}, ${localContent}`;
  }, content);

  // Add location-specific content for the main location
  const mainLocationContent = serviceKeywords.map(service => 
    `${service} ${location}, profesjonalny ${service} w ${location}, najlepszy ${service} ${location}`
  ).join(', ');

  return `${optimizedContent}, ${mainLocationContent}`;
};

export const generateLocationLinks = () => {
  const locations = [
    { name: 'Czeladź', lat: 50.3169, lon: 19.0437 },
    { name: 'Będzin', lat: 50.3257, lon: 19.1333 },
    { name: 'Sosnowiec', lat: 50.2862, lon: 19.1042 },
    { name: 'Dąbrowa Górnicza', lat: 50.3227, lon: 19.2346 },
    { name: 'Katowice', lat: 50.2649, lon: 19.0238 }
  ];

  return locations.map(location => ({
    name: location.name,
    url: `/realizacje?location=${location.name.toLowerCase()}`,
    coordinates: `${location.lat},${location.lon}`
  }));
};

export const generateServiceLinks = () => {
  const services = [
    { name: 'Montaż kuchni', category: 'kuchnie' },
    { name: 'Remont łazienki', category: 'lazienki' },
    { name: 'Przedpokoje', category: 'przedpokoje' },
    { name: 'Kompleksowe remonty', category: 'remonty' }
  ];

  return services.map(service => ({
    name: service.name,
    url: `/realizacje/${service.category}`,
    description: `Profesjonalny ${service.name.toLowerCase()} w Czeladzi i na Śląsku`
  }));
};

export const enhanceProjectMetadata = (project) => {
  const baseKeywords = project.tags || [];
  const locationVariants = [
    project.location,
    'Śląsk',
    'województwo śląskie',
    'aglomeracja śląska'
  ];

  const enhancedTags = [
    ...baseKeywords,
    ...locationVariants.map(loc => `${project.category} ${loc}`),
    ...locationVariants.map(loc => `montaż ${loc}`),
    ...locationVariants.map(loc => `remont ${loc}`)
  ];

  return {
    ...project,
    tags: [...new Set(enhancedTags)],
    seoDescription: generateSearchOptimizedContent(project.description, project.location),
    breadcrumbs: [
      { name: 'Strona główna', url: '/' },
      { name: 'Realizacje', url: '/realizacje' },
      { name: CATEGORIES.find(c => c.id === project.category)?.name || project.category, url: `/realizacje/${project.category}` },
      { name: project.title, url: null }
    ]
  };
};

const CATEGORIES = [
  { id: 'kuchnie', name: 'Kuchnie' },
  { id: 'lazienki', name: 'Łazienki' },
  { id: 'przedpokoje', name: 'Przedpokoje' },
  { id: 'remonty', name: 'Remonty' }
];

export default SearchOptimizer;