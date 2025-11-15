import AboutSectionSec from "@/app/component/reusable/porfolio/aboutme";
import EducationCertificationContent from "@/app/component/reusable/porfolio/certifications";
import ConferencesContent from "@/app/component/reusable/porfolio/conference";
import ExperienceSection from "@/app/component/reusable/porfolio/experience";
import { SectionNavbar } from "@/app/component/reusable/porfolio/navSection";
import ProjectsCarousel from "@/app/component/reusable/porfolio/projects";
import { SectionWrapper } from "@/app/component/reusable/porfolio/sectionWrapper";
import { SkillsContent } from "@/app/component/reusable/porfolio/skills";
import { getIconForSkill } from "@/app/component/reusable/porfolio/skillsIcon";
import { getConferencesPayload } from "@/app/lib/portfolioServices/conferences";
import { getExperienceByUserId } from "@/app/lib/portfolioServices/experienceServices";
import { getProjectsPayload } from "@/app/lib/portfolioServices/projectServices";
import { getSkillsPayload } from "@/app/lib/portfolioServices/skillsServices";
import { parseJobDutiesServer } from "@/app/utils/htmlTextformatter";



const userId = "C5C676ED-F6C0-4A1E-B4A8-35918F866548";
const Portfolio =async () => {
   // Fetch experiences server-side
  const experiences = await getExperienceByUserId(userId);
  const skillsData = await getSkillsPayload(userId);
    const projectsData = await getProjectsPayload(userId);
    const conferencesData = await getConferencesPayload(userId);

  // Map API skills to component format with icons
  const formattedSkills = skillsData.map((skill) => ({
    icon: getIconForSkill(skill.skillName),
    label: skill.skillName,
  }))

  // Map projects to component format
  const formattedProjects = projectsData.map((project) => ({
    projectId: project.projectId,
    title: project.title,
    description: parseJobDutiesServer(project.description).join("\n"),
    imageSrc: project.imageSrc || `https://images.unsplash.com/photo-${project.projectId % 4 === 0 ? '1550751827-4bd374c3f58b' : project.projectId % 3 === 0 ? '1510915361894-db8b60106cb1' : project.projectId % 2 === 0 ? '1563986768609-322da13575f3' : '1526374965328-7f61d4dc18c5'}?w=600&h=400&fit=crop`,
    projectUrl: project.projectUrl || undefined,
  }));

  // Map conferences to component format
  const formattedConferences = conferencesData;  

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
        <SkillsContent skills={formattedSkills} />
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience-section" title="Experience">
        {<ExperienceSection experiences={experiences} />}
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects-section" title="Projects">
        { <ProjectsCarousel projects={formattedProjects} />}
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper id="education-section" title="Education & Certification">
        {<EducationCertificationContent certifications={certifications} />}
      </SectionWrapper>

      {/* Conferences Section */}
      <SectionWrapper id="conferences-section" title="Conferences">
        {<ConferencesContent conferences={formattedConferences} />}
      </SectionWrapper>

      {/* Contact Section
      <SectionWrapper id="contact-section" title="Contact">
        {ContactComponent ? <ContactComponent /> : null}
      </SectionWrapper> */}
    </div>
  );
};

export default Portfolio;
