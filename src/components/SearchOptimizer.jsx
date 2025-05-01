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

export default SearchOptimizer;