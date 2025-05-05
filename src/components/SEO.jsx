import { useEffect } from "react";

function SEO({ title, description, keywords, canonical, image = "/og-image.jpg", type = "website" }) {
  useEffect(() => {
    // Dodatkowe słowa kluczowe dla lokalizacji
    const locationKeywords = "Czeladź, Będzin, Sosnowiec, Dąbrowa Górnicza, Katowice, Śląsk";
    const serviceKeywords = "montaż kuchni, remont łazienki, wykończenia wnętrz, remont mieszkania, przeprowadzki";
    const enhancedKeywords = `${keywords}, ${locationKeywords}, ${serviceKeywords}`;

    // Basic meta tags
    document.title = title;
    updateMetaTag("description", description);
    updateMetaTag("keywords", enhancedKeywords);

    // Lokalizacje i frazy dla przeprowadzek
    const movingKeywords = "przeprowadzki Czeladź, transport mebli Czeladź, przeprowadzki Śląsk, przeprowadzki mieszkań Czeladź, profesjonalne przeprowadzki Czeladź, tanie przeprowadzki Czeladź, firma przeprowadzkowa Czeladź";
    const enhancedKeywordsWithMoving = `${enhancedKeywords}, ${movingKeywords}`;
    
    updateMetaTag("keywords", enhancedKeywordsWithMoving);

    // Lokalizacja i zasięg działania
    updateMetaTag("geo.region", "PL-SL");
    updateMetaTag("geo.placename", "Czeladź, Śląsk");
    updateMetaTag("geo.position", "50.3169;19.0437");
    updateMetaTag("ICBM", "50.3169, 19.0437");

    // Open Graph tags
    updateMetaTag("og:type", type);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", `https://oskbudvip.pl${image}`);
    updateMetaTag("og:url", canonical);
    updateMetaTag("og:site_name", "Osk.BudVip - Montaż Kuchni i Remonty");
    updateMetaTag("og:locale", "pl_PL");

    // Twitter Cards
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `https://oskbudvip.pl${image}`);

    // Dodatkowe meta tagi dla SEO
    updateMetaTag("robots", "index, follow, max-image-preview:large");
    updateMetaTag("author", "Osk.BudVip");
    updateMetaTag("language", "pl-PL");
    updateMetaTag("revisit-after", "7 days");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");
    updateMetaTag("format-detection", "telephone=yes");
    updateMetaTag("msapplication-TileColor", "#ffc400");
    updateMetaTag("theme-color", "#ffc400");

    // Canonical URL
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Alternatywne linki językowe
    updateAlternateLinks();
  }, [title, description, keywords, canonical, image, type]);

  const updateMetaTag = (name, content) => {
    if (!content) return;

    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
    
    if (!meta) {
      meta = document.createElement("meta");
      if (name.startsWith("og:")) {
        meta.setAttribute("property", name);
      } else {
        meta.setAttribute("name", name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  const updateAlternateLinks = () => {
    // Dodaj link do wersji polskiej (domyślnej)
    let linkPl = document.querySelector("link[hreflang='pl']");
    if (!linkPl) {
      linkPl = document.createElement("link");
      linkPl.rel = "alternate";
      linkPl.hreflang = "pl";
      document.head.appendChild(linkPl);
    }
    linkPl.href = "https://oskbudvip.pl";

    // Dodaj link do wersji x-default
    let linkDefault = document.querySelector("link[hreflang='x-default']");
    if (!linkDefault) {
      linkDefault = document.createElement("link");
      linkDefault.rel = "alternate";
      linkDefault.hreflang = "x-default";
      document.head.appendChild(linkDefault);
    }
    linkDefault.href = "https://oskbudvip.pl";
  };

  return null;
}

export default SEO;
