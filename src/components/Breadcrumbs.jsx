import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateBreadcrumbs } from '../utils/seo';

function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  if (location.pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
      <ol className="flex flex-wrap items-center space-x-2 text-sm">
        <li>
          <Link to="/" className="text-gray-500 hover:text-yellow-400 transition-colors">
            Strona główna
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.url} className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {breadcrumb.isLast ? (
              <span className="text-yellow-400 font-medium">{breadcrumb.title}</span>
            ) : (
              <Link to={breadcrumb.url} className="text-gray-500 hover:text-yellow-400 transition-colors">
                {breadcrumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;