import AboutSectionSec from "@/app/component/reusable/porfolio/aboutme";
import EducationCertificationContent from "@/app/component/reusable/porfolio/certifications";
import ConferencesContent from "@/app/component/reusable/porfolio/conference";
import ExperienceSection from "@/app/component/reusable/porfolio/experience";
import { SectionNavbar } from "@/app/component/reusable/porfolio/navSection";
import ProjectsCarousel from "@/app/component/reusable/porfolio/projects";
import { SectionWrapper } from "@/app/component/reusable/porfolio/sectionWrapper";
import { SkillsContent } from "@/app/component/reusable/porfolio/skills";
import { getIconForSkill } from "@/app/component/reusable/porfolio/skillsIcon";
import { getFullName, getProfessionalTitle, getUserByUserId } from "@/app/lib/portfolioServices/aboutServices";
import { getConferencesPayload } from "@/app/lib/portfolioServices/conferences";
import { formatEducationYear, getEducationByUserId } from "@/app/lib/portfolioServices/educationServices";
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
  const educationData = await getEducationByUserId(userId);
  const userData = await getUserByUserId(userId);

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


  // Map education to component format for certifications
   const formattedEducation = educationData.map((edu) => ({
    title: edu.title,
    subtitle: "",
    institution: edu.institutionName,
    year: formatEducationYear(edu.endDate),
    image: `https://images.unsplash.com/photo-${edu.educationId.charCodeAt(0) % 4 === 0 ? '1589829545856-d10d557cf95f' : edu.educationId.charCodeAt(0) % 3 === 0 ? '1589829085413-56de8ae18c73' : edu.educationId.charCodeAt(0) % 2 === 0 ? '1606326608690-4e0281b1e588' : '1633356122544-f134324a6cee'}?w=600&h=400&fit=crop`,
  }));
  
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

  // Combine education and certifications
  const allEducationAndCerts = [...formattedEducation];

  // Extract user data for About section
  const fullName = userData ? getFullName(userData) : "Daniel Ben";
  const professionalTitle = userData ? getProfessionalTitle(userData) : "Cybersecurity Professional";
  const aboutText = userData?.aboutMeText || "Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Cubilia Curae; Donec Velit Neque, Auctor Sit Amet Aliquam Vel, Ullamcorper Sit Amet Ligula. Curabitur Non Nulla Sit Amet Nisl Ac Lectus. Nulla Quis Lorem Ut Libero Malesuada Feugiat. Curabitur Aliquet Quam Id Dui Posuere Blandit. Cras Ultricies Ligula Sed Magna Dictum Porta.";

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionNavbar items={navItems} />

      <div id="about-section">
        <AboutSectionSec
          name={fullName}
          title={professionalTitle}
          aboutText={aboutText}
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
        {<EducationCertificationContent certifications={allEducationAndCerts} />}
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
