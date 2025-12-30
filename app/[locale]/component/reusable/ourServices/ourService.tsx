"use client";
import React from "react";
import {
  ShieldAlert,
  Search,
  FileCheck,
  Radio,
  Shield,
  Lock,
  Eye,
  Server,
  LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  ShieldAlert,
  Search,
  FileCheck,
  Radio,
  Shield,
  Lock,
  Eye,
  Server,
};

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Changed from icon to iconName (string)
  iconColor: string;
  iconBgColor: string;
}

interface ServicesSectionProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  title = "Our Services",
  subtitle = 'Neque Porro Quisquam Est Qui Dolorem Ipsum Quia Dolor Sit Amet, Consectetur, Adipisci Velit..." "There Is No One Who Loves Pain Itself, Who Seeks After It And Wants To Have It, Simply Because It Is Pain',
  backgroundColor = "bg-[#f8f8f8]",
  className = "",
}) => {
  return (
    <section
      className={`relative py-16 md:py-20 lg:py-24 ${backgroundColor} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-[#1a4d6d] mb-4 md:mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              lineHeight: "100%",
              letterSpacing: "0px",
              textTransform: "capitalize",
            }}
          >
            {title}
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-sm md:text-base px-4">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = iconMap[service.iconName];

  if (!Icon) {
    console.warn(`Icon "${service.iconName}" not found in iconMap`);
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Card with rounded top and long body */}
      <div
        className="w-full relative"
        style={{
         background: "rgba(217, 217, 217, 0.7)",
          borderTopLeftRadius: "173px",
          borderTopRightRadius: "173px",
          minHeight: "600px",
          border: "1px solid rgba(226, 232, 240, 0.5)",
        }}
      >
        {/* Icon Circle - Positioned at top */}
        <div className="flex justify-center pt-8 md:pt-12">
          <div
            className="rounded-full flex items-center justify-center shadow-xl"
            style={{
              width: "clamp(100px, 15vw, 140px)",
              height: "clamp(100px, 15vw, 140px)",
              backgroundColor: service.iconBgColor,
            }}
          >
            <Icon
              className="text-white"
              style={{
                width: "clamp(50px, 8vw, 70px)",
                height: "clamp(50px, 8vw, 70px)",
                strokeWidth: 2,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-8 pb-12 text-center">
          {/* Title */}
          <h3
            className="text-[#1a4d6d] mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2vw, 1.563rem)",
              lineHeight: "40px",
              letterSpacing: "0px",
              textTransform: "capitalize",
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
