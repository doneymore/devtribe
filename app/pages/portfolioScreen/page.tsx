
import { AboutSectionSec } from "@/app/component/reusable/porfolio/aboutme";
import { SectionNavbar } from "@/app/component/reusable/porfolio/navSection";
import { SectionWrapper } from "@/app/component/reusable/porfolio/sectionWrapper";

interface PortfolioProps {
  AboutComponent?: React.ComponentType;
  SkillsComponent?: React.ComponentType;
  ExperienceComponent?: React.ComponentType;
  ProjectsComponent?: React.ComponentType;
  EducationComponent?: React.ComponentType;
  ConferencesComponent?: React.ComponentType;
  ContactComponent?: React.ComponentType;
}

const Portfolio: React.FC<PortfolioProps> = ({
  AboutComponent,
  SkillsComponent,
  ExperienceComponent,
  ProjectsComponent,
  EducationComponent,
  ConferencesComponent,
  ContactComponent,
}) => {
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
    { id: "contact", label: "Contact", targetId: "contact-section" },
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
        {SkillsComponent ? <SkillsComponent /> : null}
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience-section" title="Experience">
        {ExperienceComponent ? <ExperienceComponent /> : null}
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects-section" title="Projects">
        {ProjectsComponent ? <ProjectsComponent /> : null}
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper id="education-section" title="Education & Certification">
        {EducationComponent ? <EducationComponent /> : null}
      </SectionWrapper>

      {/* Conferences Section */}
      <SectionWrapper id="conferences-section" title="Conferences">
        {ConferencesComponent ? <ConferencesComponent /> : null}
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact-section" title="Contact">
        {ContactComponent ? <ContactComponent /> : null}
      </SectionWrapper>
    </div>
  );
};

export default Portfolio;
