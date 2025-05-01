import { useEffect } from "react";

function SEO({ title, description, keywords, canonical, image = "/og-image.jpg", type = "website" }) {
  useEffect(() => {
    // Basic meta tags
    document.title = title;
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:type", type);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", `https://oskbudvip.pl${image}`);
    updateMetaTag("og:url", canonical);
    updateMetaTag("og:site_name", "Osk.BudVip");

    // Twitter Cards
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `https://oskbudvip.pl${image}`);

    // Additional SEO tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "Osk.BudVip");
    updateMetaTag("language", "pl-PL");
    updateMetaTag("geo.region", "PL-SL");
    updateMetaTag("geo.placename", "Czeladź");
    updateMetaTag("revisit-after", "7 days");

    // Canonical URL
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
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

  return null;
}

export default SEO;
