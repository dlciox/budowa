import { useEffect } from "react";

function SEO({ title, description, keywords, canonical, image, type = "website" }) {
  useEffect(() => {
    // Basic Meta Tags
    document.title = title;
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    
    // Open Graph Tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:type", type);
    updateMetaTag("og:url", canonical);
    updateMetaTag("og:image", image || "https://oskbudvip.pl/og-image.jpg");
    updateMetaTag("og:site_name", "Osk.BudVip");
    
    // Twitter Cards
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image || "https://oskbudvip.pl/og-image.jpg");
    
    // Additional SEO Tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "Osk.BudVip");
    updateMetaTag("language", "pl-PL");
    
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
