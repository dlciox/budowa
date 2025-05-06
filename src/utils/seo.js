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
export function calculateRelevanceScore(item, searchTerm) {
  const searchLower = searchTerm.toLowerCase();
  const searchWords = searchLower.split(/\s+/).filter(Boolean);
  let score = 0;

  // Funkcja pomocnicza do normalizacji tekstu
  const normalize = (text) => text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

  // Normalizuj teksty do przeszukania
  const titleNorm = normalize(item.title);
  const descNorm = normalize(item.description);
  const locationNorm = normalize(item.location);
  const tagsNorm = item.tags ? item.tags.map(normalize) : [];
  const categoryNorm = normalize(item.category);

  // Wagi dla różnych pól
  const weights = {
    exactMatch: 100,    // Zwiększona waga za dokładne dopasowanie
    title: 50,          // Zwiększona waga za dopasowanie w tytule
    description: 10,
    location: 8,
    category: 15,
    tags: 20           // Zwiększona waga za tagi
  };

  // Sprawdź dokładne dopasowania całej frazy
  if (titleNorm === searchLower) score += weights.exactMatch * 2;
  if (descNorm.includes(searchLower)) score += weights.exactMatch;
  
  // Sprawdź dokładne dopasowania poszczególnych słów
  searchWords.forEach(word => {
    const wordNorm = normalize(word);
    
    // Sprawdź dokładne dopasowanie w tytule
    if (titleNorm.split(' ').includes(wordNorm)) {
      score += weights.title;
    } else if (titleNorm.includes(wordNorm)) {
      score += weights.title / 2;
    }
    
    // Sprawdź w opisie
    if (descNorm.includes(wordNorm)) score += weights.description;
    
    // Sprawdź w lokalizacji
    if (locationNorm.includes(wordNorm)) score += weights.location;
    
    // Sprawdź w kategorii
    if (categoryNorm === wordNorm) score += weights.category * 2;
    else if (categoryNorm.includes(wordNorm)) score += weights.category;
    
    // Sprawdź w tagach (dokładne dopasowania)
    if (tagsNorm.some(tag => tag === wordNorm)) score += weights.tags * 2;
    else if (tagsNorm.some(tag => tag.includes(wordNorm))) score += weights.tags;
  });

  // Bonus za dopasowanie wszystkich słów
  const allWordsMatch = searchWords.every(word => {
    const wordNorm = normalize(word);
    return titleNorm.includes(wordNorm) || 
           descNorm.includes(wordNorm) || 
           locationNorm.includes(wordNorm) || 
           categoryNorm.includes(wordNorm) ||
           tagsNorm.some(tag => tag.includes(wordNorm));
  });

  if (allWordsMatch) score *= 2;

  // Dodaj bonus za numeryczne dopasowanie (np. "montaż 2")
  const numberInSearch = searchLower.match(/\d+/);
  const numberInTitle = titleNorm.match(/\d+/);
  if (numberInSearch && numberInTitle && numberInSearch[0] === numberInTitle[0]) {
    score += weights.exactMatch * 3;
  }

  return score;
}

// Funkcja do generowania meta tagów dla SEO
export function generateMetaTags(page) {
  const baseTitle = "Osk.BudVip - Montaż Kuchni i Remonty";
  const baseTags = ["montaż kuchni", "remonty", "wykończenia wnętrz", "czeladź", "śląsk"];

  switch (page) {
    case "home":
      return {
        title: baseTitle,
        description: "Profesjonalny montaż mebli kuchennych, remonty i wykończenia wnętrz w Czeladzi i na Śląsku. Wieloletnie doświadczenie i setki zadowolonych klientów.",
        keywords: [...baseTags, "strona główna", "usługi remontowe", "meble na wymiar"].join(", ")
      };
    case "projects":
      return {
        title: `Realizacje | ${baseTitle}`,
        description: "Zobacz nasze projekty i realizacje. Montaż kuchni, remonty mieszkań i wykończenia wnętrz w Czeladzi i okolicach.",
        keywords: [...baseTags, "realizacje", "projekty", "galeria", "portfolio"].join(", ")
      };
    case "contact":
      return {
        title: `Kontakt | ${baseTitle}`,
        description: "Skontaktuj się z nami. Oferujemy profesjonalne usługi montażu mebli i remonty na terenie Czeladzi i całego Śląska.",
        keywords: [...baseTags, "kontakt", "wycena", "zapytanie"].join(", ")
      };
    default:
      return {
        title: baseTitle,
        description: "Profesjonalne usługi montażu mebli i wykończenia wnętrz w Czeladzi i na Śląsku.",
        keywords: baseTags.join(", ")
      };
  }
}

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