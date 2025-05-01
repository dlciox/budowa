import { useEffect } from "react";

function SEO({ title, description, keywords, canonical, image = "/og-image.jpg" }) {
  useEffect(() => {
    // Basic meta tags
    document.title = title;
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", `https://oskbudvip.pl${image}`, "property");
    updateMetaTag("og:url", canonical, "property");

    // Canonical URL
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Additional SEO meta tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "Osk.BudVip");
    updateMetaTag("language", "Polish");
    updateMetaTag("geo.region", "PL-SL");
    updateMetaTag("geo.placename", "Czeladź");
    updateMetaTag("revisit-after", "7 days");
  }, [title, description, keywords, canonical, image]);

  const updateMetaTag = (name, content, attributeName = "name") => {
    let meta = document.querySelector(`meta[${attributeName}="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attributeName, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  return null;
}

export default SEO;
