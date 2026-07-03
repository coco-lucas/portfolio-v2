import Home from "./home";
import { websiteConfig } from "@/lib/metadata";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Coco",
  url: websiteConfig.url,
  jobTitle: "Full Stack Developer",
  sameAs: [
    "https://github.com/coco-lucas",
    "https://www.linkedin.com/in/coco-lucas/",
    "https://www.instagram.com/lucas.coco_/",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Home />
    </>
  );
}
