import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Use environment variable for production domain, fallback to main domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ombugrillutah.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
