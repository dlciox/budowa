import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { images } from "../components/Import";
import SEO from "../components/SEO";
import StructuredData, {
  generateProjectSchema,
  generateLocalBusinessSchema,
} from "../components/StructuredData";
import SearchOptimizer, {
  enhanceProjectMetadata,
} from "../components/SearchOptimizer";
import Breadcrumbs from "../components/Breadcrumbs";

const CATEGORIES = [
  { id: "kuchnie", name: "Kuchnie" },
  { id: "lazienki", name: "Łazienki" },
  { id: "przedpokoje", name: "Przedpokoje" },
  { id: "remonty", name: "Remonty" },
];

const projectsData = [
  {
    id: 1,
    title: "Nowoczesna kuchnia z wyspą",
    description: "Montaż kompletnej zabudowy kuchennej z wyspą centralną",
    category: "kuchnie",
    location: "Czeladź",
    imageUrl: images["montaz1_1"],
    images: [images["montaz1_1"], images["montaz1_2"], images["montaz1_3"]],
    tags: [
      "wyspa",
      "nowoczesna",
      "biała kuchnia",
      "meble kuchenne",
      "AGD",
      "zabudowa kuchenna",
    ],
    stats: {
      duration: "2 tygodnie",
      area: "15m²",
      year: "2024",
    },
    keywords: "montaż kuchni czeladź, meble kuchenne śląsk, zabudowa kuchenna",
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
  {
    id: 8,
    title: "Nowoczesny przedpokój z szafą typu Walk-in",
    description: "Kompleksowy montaż szafy garderobianej typu Walk-in wraz z lustrem i oświetleniem LED",
    category: "przedpokoje",
    location: "Czeladź",
    imageUrl: images["montaz8_1"],
    images: [
      images["montaz8_1"],
      images["montaz8_2"],
      images["montaz8_3"],
      images["montaz8_4"],
      images["montaz8_5"],
    ],
    tags: ["przedpokój", "szafa", "garderoba", "walk-in", "LED", "lustro"],
    stats: {
      duration: "1 tydzień",
      area: "8m²",
      year: "2025",
    },
    keywords: "montaż szaf czeladź, zabudowa przedpokoju, garderoba na wymiar",
  },
];

function Projects() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const enhancedProjects = useMemo(() => {
    return projectsData.map((project) => enhanceProjectMetadata(project));
  }, []);

  const filteredProjectsByCategory = useMemo(() => {
    return enhancedProjects.filter(
      (project) =>
        !selectedCategory ||
        selectedCategory === "all" ||
        project.category === selectedCategory
    );
  }, [enhancedProjects, selectedCategory]);

  const handleCategoryChange = useCallback(
    (categoryId) => {
      setSelectedCategory(categoryId);
      navigate(
        categoryId === "all" ? "/realizacje" : `/realizacje/${categoryId}`
      );
    },
    [navigate]
  );

  const handleSearchResults = useCallback((results) => {
    setFilteredProjects(results);
  }, []);

  const openGallery = useCallback((project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!selectedProject) return;
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    },
    [selectedProject]
  );

  const prevImage = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!selectedProject) return;
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    },
    [selectedProject]
  );

  useEffect(() => {
    setIsLoading(true);
    try {
      setFilteredProjects(filteredProjectsByCategory);
    } catch (error) {
      console.error("Błąd podczas filtrowania projektów:", error);
      setFilteredProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [filteredProjectsByCategory]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (galleryOpen) {
        if (event.key === "Escape") {
          closeGallery();
        } else if (event.key === "ArrowRight") {
          nextImage();
        } else if (event.key === "ArrowLeft") {
          prevImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen, closeGallery, nextImage, prevImage]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28">
      <SEO
        title={`Realizacje ${
          category ? `- ${CATEGORIES.find((c) => c.id === category)?.name}` : ""
        } | Osk.BudVip`}
        description={`Zobacz nasze projekty i realizacje w kategorii ${
          category || "wszystkie"
        }. Profesjonalny montaż mebli, remonty i wykończenia wnętrz w Czeladzi i na Śląsku.`}
        keywords={`realizacje, projekty, ${
          category || "meble na wymiar"
        }, montaż mebli, czeladź, śląsk, remonty`}
        canonical={`https://oskbudvip.pl/realizacje${
          category ? `/${category}` : ""
        }`}
      />
      <StructuredData data={generateLocalBusinessSchema()} />
      {filteredProjects.map((project) => (
        <StructuredData
          key={project.id}
          data={generateProjectSchema(project)}
        />
      ))}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { name: "Strona główna", url: "/" },
            { name: "Realizacje", url: "/realizacje" },
            category && {
              name: CATEGORIES.find((c) => c.id === category)?.name,
              url: `/realizacje/${category}`,
            },
          ].filter(Boolean)}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Nasze Realizacje</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                selectedCategory === "all"
                  ? "bg-yellow-400 text-black shadow-yellow-200"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              type="button"
            >
              Wszystkie
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  selectedCategory === cat.id
                    ? "bg-yellow-400 text-black shadow-yellow-200"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                type="button"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SearchOptimizer
            items={filteredProjectsByCategory}
            onResultsChange={handleSearchResults}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openGallery(project)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
                  {project.images.length} zdjęć
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Lokalizacja: {project.location}</p>
                  <p>Czas realizacji: {project.stats.duration}</p>
                  <p>Powierzchnia: {project.stats.area}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs cursor-pointer hover:bg-yellow-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchTerm(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(project);
                  }}
                  type="button"
                >
                  Zobacz galerię
                </button>
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
                  onClick={() => setSearchTerm("")}
                  className="text-yellow-600 hover:text-yellow-700 ml-2"
                  type="button"
                >
                  Wyczyść wyszukiwanie
                </button>
              )}
            </p>
          </div>
        )}
      </div>

      {galleryOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div className="absolute top-4 right-4 z-50 flex gap-3">
            <button
              className="text-white bg-yellow-500 hover:bg-yellow-600 p-2 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeGallery();
              }}
              aria-label="Zamknij galerię"
              type="button"
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
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all z-20"
              onClick={prevImage}
              aria-label="Poprzednie zdjęcie"
              type="button"
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
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - zdjęcie ${
                  currentImageIndex + 1
                }`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition-all z-20"
              onClick={nextImage}
              aria-label="Następne zdjęcie"
              type="button"
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
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 text-white text-center">
            <h3 className="text-xl font-semibold">{selectedProject.title}</h3>
            <p className="text-sm opacity-75">
              Zdjęcie {currentImageIndex + 1} z {selectedProject.images.length}
            </p>
          </div>

          <div className="mt-4 flex justify-center overflow-x-auto max-w-full">
            <div className="flex gap-2 p-2">
              {selectedProject.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex-shrink-0 cursor-pointer transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-yellow-400 scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
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
