import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import Breadcrumbs from "./Breadcrumbs";
import StructuredData from "./StructuredData";

function Layout({ children }) {
  const location = useLocation();
  const pageData =
    {
      "/": {
        title: "Montaż Kuchni i Remonty Czeladź | Osk.BudVip",
        description:
          "Profesjonalny montaż mebli kuchennych, remonty i wykończenia wnętrz w Czeladzi. Kompleksowe usługi budowlane i stolarskie. ✓ Darmowa wycena ✓ Gwarancja jakości",
        keywords:
          "montaż kuchni Czeladź, remonty Czeladź, wykończenia wnętrz Czeladź, usługi stolarskie Czeladź",
        type: "website",
      },
      "/realizacje": {
        title: "Nasze Realizacje - Projekty Kuchni i Remonty | Osk.BudVip",
        description:
          "Zobacz nasze projekty i realizacje montażu kuchni, remontów oraz wykończeń wnętrz. Portfolio prac wykonanych w Czeladzi i okolicach.",
        keywords:
          "realizacje remontów, projekty kuchni, portfolio, galeria realizacji",
        type: "website",
      },
      "/kontakt": {
        title: "Kontakt - Montaż Kuchni i Remonty | Osk.BudVip",
        description:
          "Skontaktuj się z nami. Oferujemy profesjonalne usługi montażu kuchni i remontów w Czeladzi. Darmowa wycena i konsultacja.",
        keywords: "kontakt, wycena, konsultacja, montaż kuchni",
        type: "website",
      },
    }[location.pathname] || pageData["/"];

  return (
    <div className="min-h-screen">
      <SEO
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
        canonical={`https://oskbudvip.pl${location.pathname}`}
        type={pageData.type}
      />
      <StructuredData pageData={pageData} />
      <Breadcrumbs />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
