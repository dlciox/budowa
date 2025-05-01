import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { images } from "../components/Import";
import SEO from "../components/SEO";
import SearchOptimizer from "../components/SearchOptimizer";

function Projects() {
  const { category } = useParams();
  const projects = [
    {
      id: 1,
      title: "Montaż 1",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz1_1"],
      images: [
        images["montaz1_1"],
        images["montaz1_2"],
        images["montaz1_3"],
        images["montaz1_4"],
        images["montaz1_5"],
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
    {
      id: 2,
      title: "Montaż 2",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz2_1"],
      images: [
        images["montaz2_1"],
        images["montaz2_2"],
        images["montaz2_3"],
        images["montaz2_4"],
      ],
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
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz3_1"],
      images: [images["montaz3_1"], images["montaz3_2"]],
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
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz4_1"],
      images: [images["montaz4_1"]],
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
      category: "Kuchnie",
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
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz6_1"],
      images: [
        images["montaz6_1"],
        images["montaz6_2"],
        images["montaz6_3"],
        images["montaz6_4"],
      ],
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
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images["montaz7_1"],
      images: [images["montaz7_1"], images["montaz7_2"], images["montaz7_3"]],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
    },
  ];

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSearchResults = (results) => {
    setFilteredProjects(results);
  };

  const displayedProjects = category
    ? filteredProjects.filter((p) => p.category === category)
    : filteredProjects;

  return (
    <div className="min-h-screen bg-gray-100 pt-28">
      <SEO
        title="Nasze Realizacje | Osk.BudVip"
        description="Zobacz nasze projekty i realizacje. Portfolio prac wykonanych w Czeladzi i okolicach."
        keywords="realizacje, projekty, portfolio"
        canonical={`https://oskbudvip.pl/realizacje${category ? '/' + category : ''}`}
      />
      
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          {category ? `Realizacje - ${category}` : "Wszystkie realizacje"}
        </h1>

        <SearchOptimizer items={projects} onResultsChange={handleSearchResults} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayedProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Lokalizacja: {project.location}</p>
                  <p>Czas realizacji: {project.stats.duration}</p>
                  <p>Powierzchnia: {project.stats.area}</p>
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
