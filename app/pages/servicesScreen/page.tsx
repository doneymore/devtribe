import { Metadata } from "next";
import Script from "next/script";

import ServicesSection from "@/app/component/reusable/ourServices/ourService";
import { getAllServices } from "@/app/lib/blogServices";
import { mapServiceColor, mapServiceIconName } from "@/app/utils/iconMapper";
import { getImageSrc } from "@/app/utils/convertBase64toImage";

/* ================= TYPES ================= */

interface SystemSettings {
  logo?: string | null;
}

interface ServiceApiItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  systemSettings?: SystemSettings;
}

interface ServicesApiResponse {
  payload: ServiceApiItem[];
}

interface UiService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

/* ================= SEO METADATA ================= */

export const metadata: Metadata = {
  title: "Our Cybersecurity Services | Secneedle",
  description:
    "Comprehensive cybersecurity services including incident response, digital forensics, compliance reporting, and security training.",
  keywords: [
    "cybersecurity services",
    "incident response",
    "digital forensics",
    "security compliance",
    "security training",
  ],
  openGraph: {
    title: "Our Cybersecurity Services | Secneedle",
    description:
      "Expert cybersecurity solutions to protect your organization from digital threats.",
    type: "website",
    images: [
      {
        url: "/og-image-services.jpg",
        width: 1200,
        height: 630,
        alt: "Cybersecurity Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Cybersecurity Services | Secneedle",
    description: "Expert cybersecurity solutions to protect your organization.",
    images: ["/og-image-services.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Revalidate every hour
export const revalidate = 3600;

/* ================= PAGE ================= */

export default async function ServicesPage() {
  let servicesData: ServicesApiResponse | null = null;

  try {
    servicesData = await getAllServices(1);
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  /* ================= LOGO (FROM LIST) ================= */

  const logoSrc = servicesData?.payload?.length
    ? getImageSrc(servicesData.payload[0]?.systemSettings?.logo ?? null)
    : null;

  /* ================= SERVICES TRANSFORM ================= */

  const services: UiService[] = servicesData?.payload?.length
    ? servicesData.payload.map((service) => ({
        id: service.id.toString(),
        title: service.title,
        description: service.description,
        iconName: mapServiceIconName(service.icon),
        iconColor: "#FFFFFF",
        iconBgColor: mapServiceColor(service.color),
      }))
    : [];

  return (
    <main>
      {/* ========== JSON-LD STRUCTURED DATA ========== */}
      {services.length > 0 && (
        <Script
          id="services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Secneedle",
              url: "https://yourwebsite.com",
              logo: logoSrc,
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Cybersecurity Services",
                itemListElement: services.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service.title,
                    description: service.description,
                  },
                })),
              },
            }),
          }}
        />
      )}

      {/* ========== SERVICES SECTION ========== */}
      {services.length > 0 ? (
        <ServicesSection
          services={services}
          title="Our Services"
          subtitle="Comprehensive cybersecurity solutions designed to protect your organization from evolving digital threats."
        />
      ) : (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a4d6d] to-[#0d2838]">
          <div className="text-center px-4">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
              Loading Services...
            </h2>
            <p className="text-white/80">
              Please check back shortly or contact us for more information.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
