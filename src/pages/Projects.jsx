import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "../components/Import";
import SEO from "../components/SEO";
import StructuredData, { generateProjectSchema, generateLocalBusinessSchema } from "../components/StructuredData";
import SearchOptimizer, { enhanceProjectMetadata } from "../components/SearchOptimizer";
import Breadcrumbs from "../components/Breadcrumbs";

const CATEGORIES = [
  { id: 'kuchnie', name: 'Kuchnie' },
  { id: 'lazienki', name: 'Łazienki' },
  { id: 'przedpokoje', name: 'Przedpokoje' },
  { id: 'remonty', name: 'Remonty' }
];

function Projects() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const projects = [
    {
      id: 1,
      title: "Nowoczesna kuchnia z wyspą",
      description: "Montaż kompletnej zabudowy kuchennej z wyspą centralną",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz1_1"],
      images: [images["montaz1_1"], images["montaz1_2"], images["montaz1_3"]],
      tags: ["wyspa", "nowoczesna", "biała kuchnia", "meble kuchenne", "AGD", "zabudowa kuchenna"],
      stats: {
        duration: "2 tygodnie",
        area: "15m²",
        year: "2024",
      },
      keywords: "montaż kuchni czeladź, meble kuchenne śląsk, zabudowa kuchenna"
    },
    {
      id: 2,
      title: "Montaż 2",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz2_1"],
      images: [
        images["montaz2_1"],
        images["montaz2_2"],
        images["montaz2_3"],
        images["montaz2_4"],
      ],
      tags: ["kuchnia", "montaż"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 3,
      title: "Montaż 3",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz3_1"],
      images: [images["montaz3_1"], images["montaz3_2"]],
      tags: ["kuchnia", "nowoczesna"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 4,
      title: "Montaż 4",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz4_1"],
      images: [images["montaz4_1"]],
      tags: ["kuchnia", "tradycyjna"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 5,
      title: "Montaż 5",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz5_1"],
      images: [
        images["montaz5_1"],
        images["montaz5_2"],
        images["montaz5_3"],
        images["montaz5_4"],
        images["montaz5_5"],
        images["montaz5_6"],
      ],
      tags: ["kuchnia", "duża"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 6,
      title: "Montaż 6",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz6_1"],
      images: [
        images["montaz6_1"],
        images["montaz6_2"],
        images["montaz6_3"],
        images["montaz6_4"],
      ],
      tags: ["kuchnia", "mała"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 7,
      title: "Montaż 7",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz7_1"],
      images: [images["montaz7_1"], images["montaz7_2"], images["montaz7_3"]],
      tags: ["kuchnia", "stylowa"],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
  ];

  const enhancedProjects = projects.map(project => enhanceProjectMetadata(project));

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(categoryId === 'all' ? '/realizacje' : `/realizacje/${categoryId}`);
  };

  const handleSearchResults = (results) => {
    setFilteredProjects(results);
  };

  const handleSectionNavigation = (sectionId) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <div className="min-h-screen pt-28"> {/* Zwiększony padding top */}
      <SEO
        title={`Realizacje ${category ? `- ${CATEGORIES.find(c => c.id === category)?.name}` : ''} | Osk.BudVip`}
        description={`Zobacz nasze projekty i realizacje w kategorii ${category || 'wszystkie'}. Profesjonalny montaż mebli, remonty i wykończenia wnętrz w Czeladzi i na Śląsku.`}
        keywords={`realizacje, projekty, ${category || 'meble na wymiar'}, montaż mebli, czeladź, śląsk, remonty`}
        canonical={`https://oskbudvip.pl/realizacje${category ? `/${category}` : ''}`}
      />
      
      <StructuredData data={generateLocalBusinessSchema()} />
      {filteredProjects.map(project => (
        <StructuredData key={project.id} data={generateProjectSchema(project)} />
      ))}

      <div className="container mx-auto px-4">
        {/* Menu nawigacyjne */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => handleSectionNavigation('about')}
            className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-2 text-lg"
          >
            O nas
          </button>
          <button
            onClick={() => handleSectionNavigation('services')}
            className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-2 text-lg"
          >
            Usługi
          </button>
        </div>

        <Breadcrumbs
          items={[
            { name: 'Strona główna', url: '/' },
            { name: 'Realizacje', url: '/realizacje' },
            category && { 
              name: CATEGORIES.find(c => c.id === category)?.name, 
              url: `/realizacje/${category}` 
            }
          ].filter(Boolean)}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Nasze Realizacje</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                selectedCategory === 'all'
                  ? 'bg-yellow-400 text-black shadow-yellow-200'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Wszystkie
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-400 text-black shadow-yellow-200'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SearchOptimizer
            items={enhancedProjects.filter(project => 
              !selectedCategory || selectedCategory === 'all' || project.category === selectedCategory
            )}
            onResultsChange={handleSearchResults}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Lokalizacja: {project.location}</p>
                  <p>Czas realizacji: {project.stats.duration}</p>
                  <p>Powierzchnia: {project.stats.area}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs cursor-pointer hover:bg-yellow-100"
                      onClick={() => setSearchTerm(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Nie znaleziono realizacji spełniających podane kryteria.
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-yellow-600 hover:text-yellow-700 ml-2"
                >
                  Wyczyść wyszukiwanie
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
