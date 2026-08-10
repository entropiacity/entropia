import { JsonLd } from "./components/json-ld";
// import { HomePageClient } from "./components/home-page-client";
import { homePageSchemas } from "./lib/seo-schemas";
import AgenticPage from "@/components/agentic-landing";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchemas()} />
      {/* Old Entropia landing — commented out while using agentic-build layout
      <HomePageClient />
      */}
      <AgenticPage />
    </>
  );
}
