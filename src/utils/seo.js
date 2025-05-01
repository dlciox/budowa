// URL Slugifier
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Relevance Scoring for Search
export const calculateRelevanceScore = (item, searchTerm) => {
  const searchTerms = searchTerm.toLowerCase().split(' ');
  let score = 0;

  // Title match (highest weight)
  searchTerms.forEach(term => {
    if (item.title.toLowerCase().includes(term)) score += 10;
    if (item.title.toLowerCase().startsWith(term)) score += 5;
  });

  // Description match
  searchTerms.forEach(term => {
    if (item.description.toLowerCase().includes(term)) score += 3;
  });

  // Category match
  searchTerms.forEach(term => {
    if (item.category.toLowerCase().includes(term)) score += 5;
  });

  // Location match
  searchTerms.forEach(term => {
    if (item.location.toLowerCase().includes(term)) score += 4;
  });

  return score;
};

// Generate breadcrumb data
export const generateBreadcrumbs = (pathname) => {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((path, index) => ({
    title: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
    url: '/' + paths.slice(0, index + 1).join('/'),
    isLast: index === paths.length - 1
  }));
};

// Generate structured data
export const generateStructuredData = (page, data = {}) => {
  const baseUrl = 'https://oskbudvip.pl';
  
  const common = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${baseUrl}${page}`,
    "name": data.title || "Osk.BudVip",
    "description": data.description || "Profesjonalne usługi budowlano-stolarskie"
  };

  switch (page) {
    case '/realizacje':
      return {
        ...common,
        "@type": "CollectionPage",
        "about": {
          "@type": "Thing",
          "name": "Realizacje projektów budowlanych i montażowych"
        }
      };
    default:
      return common;
  }
};