import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from '../components/Import';

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [animateContent, setAnimateContent] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [animatedProjects, setAnimatedProjects] = useState([]);
  const [hoverCategory, setHoverCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Montaż 1",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz1_1'],
      images: [
        images['montaz1_1'],
        images['montaz1_2'],
        images['montaz1_3'],
        images['montaz1_4'],
        images['montaz1_5']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 2,
      title: "Montaż 2",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz2_1'],
      images: [
        images['montaz2_1'],
        images['montaz2_2'],
        images['montaz2_3'],
        images['montaz2_4']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 3,
      title: "Montaż 3",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz3_1'],
      images: [
        images['montaz3_1'],
        images['montaz3_2']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 4,
      title: "Montaż 4",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz4_1'],
      images: [
        images['montaz4_1']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 5,
      title: "Montaż 5",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz5_1'],
      images: [
        images['montaz5_1'],
        images['montaz5_2'],
        images['montaz5_3'],
        images['montaz5_4'],
        images['montaz5_5'],
        images['montaz5_6']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 6,
      title: "Montaż 6",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz6_1'],
      images: [
        images['montaz6_1'],
        images['montaz6_2'],
        images['montaz6_3'],
        images['montaz6_4']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    },
    {
      id: 7,
      title: "Montaż 7",
      description: "Kompleksowy montaż wraz z wykończeniem.",
      category: "Kuchnie",
      location: "Czeladź",
      imageUrl: images['montaz7_1'],
      images: [
        images['montaz7_1'],
        images['montaz7_2'],
        images['montaz7_3']
      ],
      stats: {
        duration: "2 tygodnie",
        area: "10m²",
        year: "2024",
      },
      fullDescription: "Kompleksowy projekt montażu obejmujący pełen zakres prac wykończeniowych.",
      materials: [
        "Materiał",
        "Materiał",
        "Materiał",
        "Materiał"
      ],
      scope: [
        "Montaż",
        "Wykończenie",
        "Instalacja",
        "Prace dodatkowe"
      ],
    }
  ]);

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
      description: "Kompleksowa pomoc przy przeprowadzkach, transport i montaż mebli",
      image: "https://placehold.co/800x400/e6e6e6/808080?text=Przeprowadzki",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
    },
  ];

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      {!selectedCategory && !selectedProject ? (
        <div
          className={`container mx-auto px-4 py-8 transition-all duration-500 ${
            exitAnimation
              ? "opacity-0 transform -translate-y-10"
              : "opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h1
              className={`text-4xl font-bold mb-4 text-center transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              Nasze Realizacje
            </h1>
            <p
              className={`text-gray-600 text-lg mb-12 text-center transition-all duration-700 delay-100 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              Odkryj nasze profesjonalne projekty w różnych kategoriach
            </p>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform ${
                    animateContent
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleCategoryChange(category.id)}
                  onMouseEnter={() => setHoverCategory(category.id)}
                  onMouseLeave={() => setHoverCategory(null)}
                >
                  <div className="flex items-center p-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent transition-opacity duration-300 ${
                        hoverCategory === category.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></div>

                    <div className="mr-6 p-3 bg-yellow-400 rounded-lg text-black relative z-10 transition-all duration-300 transform group-hover:scale-110">
                      {category.icon}
                    </div>

                    <div className="flex-grow relative z-10">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-yellow-600 transition-colors">
                        {category.title}
                      </h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>

                    <div className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : selectedProject ? (
        <div
          className={`container mx-auto px-4 py-8 transition-all duration-500 ${
            exitAnimation ? "opacity-0 transform translate-y-10" : "opacity-100"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div
              className={`flex items-center mb-8 transition-all duration-500 ${
                animateContent
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <button
                onClick={handleBackToProjects}
                className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
            </div>

            <div
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ${
                animateContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative h-96 bg-gray-800">
                {selectedProject.images &&
                  selectedProject.images.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        currentSlide === index
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.title} - zdjęcie ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
                  <button
                    className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    onClick={prevSlide}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    onClick={nextSlide}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                  {selectedProject.images &&
                    selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentSlide === index
                            ? "bg-yellow-400"
                            : "bg-white/50"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div>
                    <div className="text-sm font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full inline-block mb-2">
                      {selectedProject.category}
                    </div>
                    <h2 className="text-2xl font-bold">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-5 h-5 mr-2 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {selectedProject.location}
                    </div>
                    {selectedProject.stats.year && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg
                          className="w-5 h-5 mr-2 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {selectedProject.stats.year}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4">Opis projektu</h3>
                    <p className="text-gray-600 mb-6">
                      {selectedProject.fullDescription ||
                        selectedProject.description}
                    </p>

                    {selectedProject.scope && (
                      <div className="mb-6">
                        <h4 className="font-bold mb-2">Zakres prac:</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {selectedProject.scope.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Szczegóły</h3>

                    <div className="space-y-4">
                      {selectedProject.stats.duration && (
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-3 text-yellow-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">Czas realizacji</div>
                            <div className="text-gray-600">
                              {selectedProject.stats.duration}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.stats.area && (
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-3 text-yellow-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">Powierzchnia</div>
                            <div className="text-gray-600">
                              {selectedProject.stats.area}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.stats.units && (
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-3 text-yellow-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <div>
                            <div className="font-semibold">Ilość</div>
                            <div className="text-gray-600">
                              {selectedProject.stats.units}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedProject.materials && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Użyte materiały:</h4>
                        <ul className="text-gray-600 space-y-1">
                          {selectedProject.materials.map((material, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                              {material}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold">
                        Podobał Ci się ten projekt?
                      </h3>
                      <p className="text-gray-600">
                        Skontaktuj się z nami, aby omówić swój projekt.
                      </p>
                    </div>
                    <Link
                      to="/kontakt"
                      className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    >
                      Skontaktuj się
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`container mx-auto px-4 py-8 transition-all duration-500 ${
            exitAnimation ? "opacity-0 transform translate-y-10" : "opacity-100"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div
              className={`flex items-center mb-8 transition-all duration-500 ${
                animateContent
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <button
                onClick={() => handleCategoryChange(null)}
                className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold">{selectedCategory}</h1>
            </div>

            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg duration-500 transform 
                    ${
                      animatedProjects.includes(project.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <div className="text-sm font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full inline-block mb-2">
                            {project.category}
                          </div>
                          <h3 className="text-xl font-bold">{project.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className="w-5 h-5 mr-2 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {project.location}
                        </div>
                        {project.stats.duration && (
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-5 h-5 mr-2 text-yellow-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {project.stats.duration}
                          </div>
                        )}
                        {project.stats.area && (
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-5 h-5 mr-2 text-yellow-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                              />
                            </svg>
                            {project.stats.area}
                          </div>
                        )}
                      </div>
                      <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                        Zobacz szczegóły
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
