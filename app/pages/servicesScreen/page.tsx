import ServicesSection from "@/app/component/reusable/ourServices/ourService";


// This is your main page component with default export
export default function ServicesPage() {
  const services = [
    {
      id: "1",
      title: "Incident Response",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      iconName: "ShieldAlert", // Changed: use string instead of component
      iconColor: "#FFFFFF",
      iconBgColor: "#D946EF", // Magenta/Pink
    },
    {
      id: "2",
      title: "Digital Forensics",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      iconName: "Search", // Changed: use string instead of component
      iconColor: "#FFFFFF",
      iconBgColor: "#FB923C", // Orange
    },
    {
      id: "3",
      title: "Reporting & Compliance",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      iconName: "FileCheck", // Changed: use string instead of component
      iconColor: "#FFFFFF",
      iconBgColor: "#3B82F6", // Blue
    },
    {
      id: "4",
      title: "Training & Awareness",
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      iconName: "Radio", // Changed: use string instead of component
      iconColor: "#FFFFFF",
      iconBgColor: "#EF4444", // Red
    },
  ];

  return (
    <main>
      <ServicesSection services={services} />
    </main>
  );
}