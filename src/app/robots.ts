import { MetadataRoute } from "next";
import { personalInfo } from "@/config/personal";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/"],
    },
    sitemap: `${personalInfo.siteUrl}/sitemap.xml`,
  };
}
