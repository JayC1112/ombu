import { Metadata } from "next";

const siteUrl = "https://ombugrillutah.com";

export const metadata: Metadata = {
  title: "Menu | All-You-Can-Eat Korean BBQ & Hot Pot",
  description:
    "View the full Ombu Grill menu. 80+ items including premium Korean BBQ meats, seafood, appetizers, rice bowls, boba drinks & desserts. All-you-can-eat lunch and dinner.",
  keywords: [
    "Ombu Grill menu",
    "Korean BBQ menu",
    "KBBQ menu Utah",
    "all you can eat menu",
    "Korean BBQ items",
    "bulgogi menu",
    "galbi menu",
    "hot pot menu Utah",
  ],
  alternates: {
    canonical: `${siteUrl}/menu`,
  },
  openGraph: {
    title: "Menu | Ombu Grill Korean BBQ Utah",
    description:
      "80+ items including premium Korean BBQ meats, seafood, appetizers, rice bowls, boba drinks & desserts. All-you-can-eat lunch and dinner.",
    url: `${siteUrl}/menu`,
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
