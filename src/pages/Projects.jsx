import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { images } from "../components/Import";
import SEO from "../components/SEO";
import SearchOptimizer from "../components/SearchOptimizer";

function Projects() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [animateContent, setAnimateContent] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [animatedProjects, setAnimatedProjects] = useState([]);
  const [hoverCategory, setHoverCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setAnimateContent(false);
    setTimeout(() => {
      setAnimateContent(true);
    }, 100);
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategory === null) {
      setExitAnimation(true);
      setTimeout(() => {
        setSelectedCategory(categoryId);
        setExitAnimation(false);
        setAnimateContent(false);
        setAnimatedProjects([]);
        setTimeout(() => {
          setAnimateContent(true);
          const projectsToAnimate = projects.filter(
            (project) => project.category === categoryId
          );
          projectsToAnimate.forEach((project, index) => {
            setTimeout(() => {
              setAnimatedProjects((prev) => [...prev, project.id]);
            }, 100 * (index + 1));
          });
        }, 300);
      }, 300);
    } else {
      setExitAnimation(true);
      setTimeout(() => {
        setSelectedCategory(null);
        setExitAnimation(false);
        setAnimateContent(false);
        setTimeout(() => {
          setAnimateContent(true);
        }, 100);
      }, 300);
    }
  };

  const handleProjectSelect = (project) => {
    setExitAnimation(true);
    setTimeout(() => {
      setSelectedProject(project);
      setCurrentSlide(0);
      setExitAnimation(false);
      setAnimateContent(false);
      setTimeout(() => {
        setAnimateContent(true);
      }, 100);
    }, 300);
  };

  const handleBackToProjects = () => {
    setExitAnimation(true);
    setTimeout(() => {
      setSelectedProject(null);
      setExitAnimation(false);
      setAnimateContent(false);
      setTimeout(() => {
        setAnimateContent(true);
      }, 100);
    }, 300);
  };

  const nextSlide = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentSlide((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentSlide((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    if (
      selectedProject &&
      selectedProject.images &&
      selectedProject.images.length > 1
    ) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % selectedProject.images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedProject]);

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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
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
      fullDescription:
        "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: ["Materiał", "Materiał", "Materiał", "Materiał"],
      scope: ["Montaż", "Wykończenie", "Instalacja", "Prace dodatkowe"],
    },
  ];

  const handleSearchResults = (results) => {
    setFilteredProjects(results);
  };

  const displayedProjects = category
    ? filteredProjects.filter((p) => p.category === category)
    : filteredProjects;

  const categories = [
    {
      id: "Kuchnie",
      title: "Kuchnie",
      description:
        "Profesjonalny montaż mebli kuchennych wraz z podłączeniem sprzętu AGD",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Kuchnie",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18v18H3zM3 9h18M15 3v18"
          />
        </svg>
      ),
    },
    {
      id: "Łazienki",
      title: "Łazienki",
      description: "Kompleksowe remonty i wykończenia łazienek",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Łazienki",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12h-3m3 0v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m18 0v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5m18 0H3"
          />
        </svg>
      ),
    },
    {
      id: "Przedpokoje",
      title: "Przedpokoje",
      description: "Nowoczesne aranżacje i zabudowy przedpokoi",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Przedpokoje",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: "Remonty",
      title: "Remonty kompleksowe",
      description: "Pełen zakres prac remontowych od A do Z",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Remonty",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "Stolarka",
      title: "Stolarka",
      description: "Montaż drzwi, okien i innych elementów stolarskich",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Stolarka",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
    {
      id: "Przeprowadzki",
      title: "Przeprowadzki",
      description:
        "Kompleksowa pomoc przy przeprowadzkach, transport i montaż mebli",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Przeprowadzki",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <SEO
        title="Realizacje, Projekty i Prace Budowlane Czeladź | Osk.BudVip"
        description="Zobacz nasze realizacje: montaż kuchni, wykończenia wnętrz, wymiana stolarki, prace konstrukcyjne i remonty w Czeladzi. Portfolio profesjonalnych usług."
        keywords="projekty budowlane Czeladź, realizacje remontów Czeladź, montaż kuchni Czeladź, wykończenia wnętrz Czeladź, portfolio usług Czeladź, projekty budowlane Śląsk, realizacje remontów Śląsk, montaż kuchni Śląsk, wykończenia wnętrz Śląsk, portfolio usług Śląsk"
        canonical="https://oskbudvip.pl/projects"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {category ? `Realizacje - ${category}` : "Wszystkie realizacje"}
        </h1>

        <SearchOptimizer items={projects} onResultsChange={handleSearchResults} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayedProjects.map((project, index) => (
            <article key={index} className="border rounded-lg overflow-hidden">
              {/* Project card content */}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
