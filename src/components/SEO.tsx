// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  slug?: string;
}

export function SEO({ title, description, image, article, slug }: SEOProps) {
  const siteUrl = "https://asblast.space";
  const fullUrl = slug ? `${siteUrl}${slug}` : siteUrl;
  const defaultImage = `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Balises Standards */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${slug || ""}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${slug || ""}`} />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}${slug || ""}`}
      />
      {/* Open Graph / Facebook */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
