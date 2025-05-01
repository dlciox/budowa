import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { images } from "../components/Import";
import SEO from "../components/SEO";

const CATEGORIES = [
  { id: 'kuchnie', name: 'Kuchnie' },
  { id: 'lazienki', name: 'Łazienki' },
  { id: 'przedpokoje', name: 'Przedpokoje' },
  { id: 'szafy', name: 'Szafy' },
  { id: 'meble-na-wymiar', name: 'Meble na wymiar' },
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
      tags: ["wyspa", "nowoczesna", "biała kuchnia"],
      stats: {
        duration: "2 tygodnie",
        area: "15m²",
        year: "2024",
      }
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

  useEffect(() => {
    filterProjects();
  }, [searchTerm, selectedCategory]);

  const filterProjects = () => {
    let filtered = [...projects];
    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProjects(filtered);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(categoryId === 'all' ? '/realizacje' : `/realizacje/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SEO
          title={`Realizacje ${category ? `- ${CATEGORIES.find(c => c.id === category)?.name}` : ''} | Osk.BudVip`}
          description="Zobacz nasze projekty i realizacje. Montaże kuchni, łazienek i innych mebli na wymiar."
          keywords={`realizacje, projekty, ${category || 'meble na wymiar'}, montaż mebli`}
          canonical={`https://oskbudvip.pl/realizacje${category ? `/${category}` : ''}`}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Nasze Realizacje</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Wszystkie
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Szukaj realizacji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
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
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
