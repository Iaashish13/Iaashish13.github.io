import { personalInfo } from "@/config/personal";

// Escape characters that could break out of a <script> tag or corrupt JSON-LD.
// Prevents stored XSS if frontmatter (e.g. a blog title) ever contains "</script>".
function serializeJsonLd(schema: object): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

interface PersonSchemaProps {
  type?: "Person" | "BlogPosting" | "Article";
  blogData?: {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    category: string;
  };
}

export function StructuredData({ type = "Person", blogData }: PersonSchemaProps) {
  if (type === "Person") {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      url: personalInfo.siteUrl,
      email: personalInfo.email,
      image: `${personalInfo.siteUrl}${personalInfo.photo}`,
      sameAs: [
        personalInfo.github,
        personalInfo.linkedin,
        personalInfo.twitter,
        personalInfo.medium,
      ],
      knowsAbout: [
        "Flutter Development",
        "Mobile Application Development",
        "React",
        "Next.js",
        "Dart",
        "JavaScript",
        "TypeScript",
        "Software Engineering",
      ],
      description: personalInfo.about,
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
      />
    );
  }

  if (type === "BlogPosting" && blogData) {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogData.title,
      description: blogData.description,
      author: {
        "@type": "Person",
        name: personalInfo.name,
        url: personalInfo.siteUrl,
      },
      publisher: {
        "@type": "Person",
        name: personalInfo.name,
        url: personalInfo.siteUrl,
      },
      datePublished: blogData.date,
      dateModified: blogData.date,
      url: `${personalInfo.siteUrl}/blog/${blogData.slug}`,
      image: `${personalInfo.siteUrl}${personalInfo.photo}`,
      keywords: blogData.tags.join(", "),
      articleSection: blogData.category,
      inLanguage: "en-US",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${personalInfo.siteUrl}/blog/${blogData.slug}`,
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogSchema) }}
      />
    );
  }

  return null;
}

export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalInfo.name} - Portfolio & Blog`,
    description: personalInfo.about,
    url: personalInfo.siteUrl,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${personalInfo.siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
    />
  );
}
