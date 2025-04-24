import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import buildingImage from '../assets/montaz6/building-1080594_1280.jpg';
import { images } from '../components/Import';

function Home() {
  // Stan do śledzenia pozycji przewijania dla efektu paralaksy
  const [scrollPosition, setScrollPosition] = useState(0);

  // Efekt dla animacji przy ładowaniu strony i efektu paralaksy
  useEffect(() => {
    // Funkcja do obsługi animacji przy przewijaniu
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Animacja elementów podczas scrollowania
      const elements = document.querySelectorAll(".scroll-animate");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
          element.classList.add("animate-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [iconPositions, setIconPositions] = useState([]);

  useEffect(() => {
    const generatePositions = () => {
      const positions = [];
      for (let i = 0; i < 6; i++) {
        positions.push({
          translateX: Math.sin(Date.now() / 1000 + i) * 10,
          translateY: Math.cos(Date.now() / 1500 + i) * 10,
          rotate: Math.sin(Date.now() / 2000 + i) * 5,
        });
      }
      setIconPositions(positions);
    };

    const interval = setInterval(generatePositions, 50);
    generatePositions();

    return () => clearInterval(interval);
  }, []);

  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    satisfaction: 0,
    defects: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleCounterAnimation = () => {
      if (hasAnimated) return;

      const statsSection = document.getElementById("stats");
      if (!statsSection) return;

      const rect = statsSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isVisible) {
        setHasAnimated(true);
        const targetValues = {
          years: 4,
          projects: 50,
          satisfaction: 100,
          defects: 0,
        };

        const duration = 2000;
        const startTime = performance.now();

        const animate = () => {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const easeProgress = 1 - Math.pow(1 - progress, 3);

          setCounters({
            years: Math.round(targetValues.years * easeProgress),
            projects: Math.round(targetValues.projects * easeProgress),
            satisfaction: Math.round(targetValues.satisfaction * easeProgress),
            defects: targetValues.defects,
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      if (!hasAnimated) {
        handleCounterAnimation();
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleCounterAnimation, 500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  const heroBackgroundStyle = {
    transform: `translateY(${scrollPosition * 0.3}px)`,
  };

  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Get random projects for showcase
    const getRandomProjects = () => {
      const allProjects = [
        {
          id: 1,
          title: "Montaż 1",
          description: "Kompleksowy montaż wraz z wykończeniem.",
          category: "Kuchnie",
          imageUrl: images['montaz1_1'],
        },
        {
          id: 2,
          title: "Montaż 2",
          description: "Kompleksowy montaż wraz z wykończeniem.",
          category: "Kuchnie",
          imageUrl: images['montaz2_1'],
        },
        {
          id: 3,
          title: "Montaż 3",
          description: "Kompleksowy montaż wraz z wykończeniem.",
          category: "Przedpokoje",
          imageUrl: images['montaz3_1'],
        },
      ];
      
      // Shuffle and get first 3
      return [...allProjects].sort(() => 0.5 - Math.random()).slice(0, 3);
    };
    
    setFeaturedProjects(getRandomProjects());
  }, []);

  return (
    <div className="min-h-screen">
      <section
        id="home"
        className="relative h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
            transform: `translateY(${scrollPosition * 0.15}px)`,
          }}
        ></div>

        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')", // This image shows interior renovation/furniture work
            transform: `translateY(${scrollPosition * 0.3}px) scale(${
              1 + scrollPosition * 0.0005
            })`,
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto animate-fade-in text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-bounce-in">
              Profesjonalne Usługi Budowlane
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 animate-slide-up">
              Realizujemy projekty od fundamentów po wykończenie. Zaufaj naszemu
              doświadczeniu i profesjonalizmowi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#services"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Nasze Usługi
              </a>
              <Link
                to="/kontakt"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Skontaktuj się
              </Link>
            </div>
          </div>
        </div>

        {/* Przewijaj w dół button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a
            href="#services"
            className="text-white opacity-80 hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Services Section z animacją */}
      <section
        id="services"
        className="py-20 bg-gray-50 scroll-margin-top-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animate">
              Nasze Usługi
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto scroll-animate">
              Oferujemy kompleksowe usługi remontowo-budowlane, specjalizując
              się w montażu kuchni i pracach wykończeniowych.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 scroll-animate"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-yellow-400 mb-6">
                  <div className="w-16 h-16">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section z animacją */}
      <section
        id="about"
        className="section bg-black text-white relative overflow-hidden scroll-margin-top-24"
      >
        <div className="absolute inset-0 bg-[url('https://placehold.co/1200x800/2a2a2a/333333?text=Tło+o+nas')] bg-no-repeat bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 scroll-animate relative pb-4">
                O Naszej Firmie
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-yellow-400"></span>
              </h2>
              <p className="mb-4 scroll-animate">
                <span className="text-yellow-400 font-bold">Osk.BudVip</span> to
                firma z 4-letnim doświadczeniem w branży budowlano-stolarskiej,
                specjalizująca się w montażu kuchni i pracach wykończeniowych.
              </p>
              <p
                className="mb-6 scroll-animate"
                style={{ animationDelay: "0.2s" }}
              >
                Nasz zespół wykonał około 50 kompletnych projektów kuchennych,
                zawsze dbając o najwyższą jakość i zadowolenie klienta.
                Montujemy kuchnie od A do Z, włącznie z instalacją sprzętu AGD.
              </p>
              <ul className="space-y-2">
                <li
                  className="flex items-center scroll-animate"
                  style={{ animationDelay: "0.3s" }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4+ lat doświadczenia w branży
                </li>
                <li
                  className="flex items-center scroll-animate"
                  style={{ animationDelay: "0.4s" }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  50+ zrealizowanych projektów kuchennych
                </li>
                <li
                  className="flex items-center scroll-animate"
                  style={{ animationDelay: "0.5s" }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kompleksowa usługa montażu i wykończenia
                </li>
                <li
                  className="flex items-center scroll-animate"
                  style={{ animationDelay: "0.6s" }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profesjonalne podejście i dbałość o szczegóły
                </li>
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <div 
                className="aspect-square w-full bg-cover bg-center rounded-lg" 
                style={{
                  backgroundImage: `url(${buildingImage})`
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-6 bg-gray-800 rounded-lg hover-lift scroll-animate shadow-md">
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {counters.years}
              </div>
              <div className="uppercase text-sm tracking-wider">
                Lat Doświadczenia
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover-lift scroll-animate shadow-md">
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {counters.projects}+
              </div>
              <div className="uppercase text-sm tracking-wider">
                Zakończonych Projektów
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover-lift scroll-animate shadow-md">
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {counters.satisfaction}%
              </div>
              <div className="uppercase text-sm tracking-wider">
                Zadowolonych Klientów
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover-lift scroll-animate shadow-md">
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {counters.defects}
              </div>
              <div className="uppercase text-sm tracking-wider">Fuszerki</div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Quote Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Add gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Add animated shapes in the background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                background: `linear-gradient(45deg, #fbbf24 0%, #d97706 100%)`,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float ${Math.random() * 15 + 25}s infinite ease-in-out`,
                opacity: 0.3
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-black/50 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 scroll-animate text-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Gotowy na rozpoczęcie projektu?
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-3xl mx-auto scroll-animate text-center">
              Skontaktuj się z nami już dziś, aby omówić szczegóły Twojego projektu.
              Oferujemy bezpłatną wycenę i profesjonalne doradztwo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/kontakt"
                className="group relative overflow-hidden rounded-lg bg-yellow-400 px-8 py-4 text-black transition-transform hover:scale-105"
              >
                <span className="relative z-10 font-bold">Otrzymaj darmową wycenę</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <a
                href="tel:690112664"
                className="group relative overflow-hidden rounded-lg px-8 py-4 text-white border-2 border-yellow-400 transition-transform hover:scale-105"
              >
                <span className="relative z-10 font-bold">Zadzwoń teraz</span>
                <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 scroll-animate">
              Zobacz nasze realizacje
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto scroll-animate text-gray-600">
              Sprawdź nasze najnowsze projekty i przekonaj się o jakości naszych usług.
              Ponad 50 zadowolonych klientów i setki udanych realizacji.
            </p>
            <Link
              to="/realizacje"
              className="inline-block group relative overflow-hidden rounded-lg bg-yellow-400 px-8 py-4 text-black transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 font-bold">Zobacz wszystkie realizacje</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </div>

          {/* Project previews with hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {featuredProjects.map((project, index) => (
              <Link
                to={`/realizacje?category=${project.category}`}
                key={project.id}
                className="group relative h-80 overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:scale-105"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="text-sm font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full inline-block mb-2 w-fit">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-yellow-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Zobacz więcej
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Dane usług z ikonami
const services = [
  {
    title: "Montaż Kuchni",
    description:
      "Profesjonalny montaż mebli kuchennych wraz z podłączeniem sprzętu AGD.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1h12v8H4V6zm9 5a1 1 0 110 2 1 1 0 010-2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Prace Wykończeniowe",
    description:
      "Kompleksowe wykończenia wnętrz, w tym malowanie, tapetowanie i montaż paneli.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Wymiana Stolarki",
    description:
      "Profesjonalna wymiana drzwi, okien i innych elementów stolarskich.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586l-1.707-1.707A1 1 0 0012 2h-4a1 1 0 00-.707.293L5.586 4H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Prace Konstrukcyjne",
    description:
      "Wyburzenia, wzmacnianie konstrukcji oraz budowa nowych ścian.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Remonty Kompleksowe",
    description:
      "Pełen zakres prac remontowych od A do Z, dostosowany do potrzeb klienta.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Przeprowadzki",
    description: "Profesjonalna pomoc przy przeprowadzkach: transport, wnoszenie mebli, demontaż i montaż wyposażenia.",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
  }
];

export default Home;
