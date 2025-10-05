import AboutSectionSec from "@/app/component/reusable/porfolio/aboutme";
import EducationCertificationContent from "@/app/component/reusable/porfolio/certifications";
import ConferencesContent from "@/app/component/reusable/porfolio/conference";
import ExperienceSection from "@/app/component/reusable/porfolio/experience";
import { SectionNavbar } from "@/app/component/reusable/porfolio/navSection";
import ProjectsCarousel from "@/app/component/reusable/porfolio/projects";
import { SectionWrapper } from "@/app/component/reusable/porfolio/sectionWrapper";
import { SkillsContent } from "@/app/component/reusable/porfolio/skills";

interface PortfolioProps {
  AboutComponent?: React.ComponentType;
  SkillsComponent?: React.ComponentType;
  ExperienceComponent?: React.ComponentType;
  ProjectsComponent?: React.ComponentType;
  EducationComponent?: React.ComponentType;
  ConferencesComponent?: React.ComponentType;
  ContactComponent?: React.ComponentType;
}

const Portfolio = () => {
  const navItems = [
    { id: "about", label: "About", targetId: "about-section" },
    { id: "skills", label: "Skills", targetId: "skills-section" },
    { id: "experience", label: "Experience", targetId: "experience-section" },
    { id: "projects", label: "Projects", targetId: "projects-section" },
    {
      id: "education",
      label: "Education & Certification",
      targetId: "education-section",
    },
    {
      id: "conferences",
      label: "Conferences",
      targetId: "conferences-section",
    },
    // { id: "contact", label: "Contact", targetId: "contact-section" },
  ];

  const certifications = [
    {
      title: "Software Engineering",
      subtitle: "Degree",
      institution: "Western Governors University",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    },
    {
      title: "Information Technology",
      subtitle: "Management Degree",
      institution: "Western Governors University",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop",
    },
    {
      title: "SANS GCIH",
      subtitle: "",
      institution: "GIAC",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=600&h=400&fit=crop",
    },
    {
      title: "Investigating Windows",
      subtitle: "Endpoint",
      institution: "13Cubed",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    },
    {
      title: "Investigating Windows",
      subtitle: "Memory",
      institution: "13Cubed",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    },
    {
      title: "Security+",
      subtitle: "",
      institution: "CompTIA",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    },
  ];
  const conferences = [
    {
      name: "Black Hat",
      description:
        "This is one of the most recognized and technical conferences in the industry, with events held annually in the U.S., Europe, and Asia. It focuses on briefings and hands-on training that showcase the latest security research, threats, and vulnerabilities.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      imageAlt: "Black Hat Conference Logo",
    },
    {
      name: "RSA Conference",
      description:
        "A long-running, premier conference that brings together leading experts, vendors, and security professionals. It's an excellent event for networking, staying on top of industry trends, and learning about a wide range of security topics.",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
      imageAlt: "RSA Conference Logo",
    },
    {
      name: "DEF CON",
      description:
        "The world's largest and most famous hacker convention, typically held alongside Black Hat in Las Vegas. It offers a more casual, community-driven atmosphere with hands-on workshops, live hacking demonstrations, and Capture The Flag (CTF) competitions.",
      image:
        "https://images.unsplash.com/photo-1558403194-611308249627?w=400&h=300&fit=crop",
      imageAlt: "DEF CON Logo",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionNavbar items={navItems} />

      <div id="about-section">
        <AboutSectionSec
          name="Daniel Ben"
          title="Cybersecurity Professional"
          aboutText="Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Cubilia Curae; Donec Velit Neque, Auctor Sit Amet Aliquam Vel, Ullamcorper Sit Amet Ligula. Curabitur Non Nulla Sit Amet Nisl Ac Lectus. Nulla Quis Lorem Ut Libero Malesuada Feugiat. Curabitur Aliquet Quam Id Dui Posuere Blandit. Cras Ultricies Ligula Sed Magna Dictum Porta."
        />
      </div>
      {/* </SectionWrapper> */}

      {/* Skills Section */}
      <SectionWrapper id="skills-section" title="Skills">
        <SkillsContent />
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience-section" title="Experience">
        {<ExperienceSection />}
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects-section" title="Projects">
        {<ProjectsCarousel />}
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper id="education-section" title="Education & Certification">
        {<EducationCertificationContent certifications={certifications} />}
      </SectionWrapper>

      {/* Conferences Section */}
      <SectionWrapper id="conferences-section" title="Conferences">
        {<ConferencesContent />}
      </SectionWrapper>

      {/* Contact Section
      <SectionWrapper id="contact-section" title="Contact">
        {ContactComponent ? <ContactComponent /> : null}
      </SectionWrapper> */}
    </div>
  );
};

export default Portfolio;
