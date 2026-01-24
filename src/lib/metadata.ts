import { Metadata } from "next";
import { personalInfo } from "@/config/personal";

export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${personalInfo.siteUrl}${path}`;
  const imageUrl = image || `${url}/og-image.jpg`;

  return {
    title: `${title} - ${personalInfo.name}`,
    description,
    keywords: [
      "Flutter",
      "React",
      "Next.js",
      "Mobile Development",
      "Web Development",
      "Software Engineering",
      "Aashish Regmi",
    ],
    authors: [{ name: personalInfo.name }],
    creator: personalInfo.name,
    publisher: personalInfo.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: `${title} - ${personalInfo.name}`,
      description,
      siteName: personalInfo.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${personalInfo.name}`,
      description,
      creator: "@whois_aashish_",
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createBlogMetadata({
  title,
  description,
  slug,
  tags,
  category,
}: {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
  category?: string;
}): Metadata {
  const keywords = [
    ...(tags || []),
    ...(category ? [category] : []),
    "Flutter",
    "React",
    "Next.js",
    "Mobile Development",
    "Web Development",
    "Software Engineering",
    "Aashish Regmi",
    "Tutorial",
    "Blog",
  ];

  return {
    ...createMetadata({
      title,
      description,
      path: `/blog/${slug}`,
    }),
    keywords: [...new Set(keywords)], // Remove duplicates
    category: category || "Technology",
    classification: "Technology Blog",
  };
}
