import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ items }) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-800 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-yellow-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* Structured Data for Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://oskbudvip.pl${item.url}`
          }))
        })}
      </script>
    </nav>
  );
}

export default Breadcrumbs;