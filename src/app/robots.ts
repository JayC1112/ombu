import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Use environment variable for production domain, fallback to default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ombu-eosin.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
