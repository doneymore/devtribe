// components/TeamSection.tsx
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageId: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Chief Information Security Officer (CISO)',
    description: 'Leads cybersecurity vision, risk strategy and program for the organization.',
    imageId: '1560250097-0b93528c311a'
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Penetration Testers (Ethical Hackers)',
    description: 'Test security defenses ethically by attempting to breach them to find vulnerabilities.',
    imageId: '1573496359-ca8253c6f948'
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Security Architects',
    description: 'Design and build secure IT infrastructure and systems.',
    imageId: '1573497019940-1c28c88b4f3e'
  },
  {
    id: 4,
    name: 'Rachel Thompson',
    role: 'Cybersecurity Analysts',
    description: 'Monitors networks for security threats, and implements solutions to protect the organization.',
    imageId: '1580489944761-15a19d654956'
  },
  {
    id: 5,
    name: 'Michael Rodriguez',
    role: 'Security Engineers',
    description: 'Develop and implement security solutions, systems and processes.',
    imageId: '1556157382-97eda605d2f9'
  },
  {
    id: 6,
    name: 'Jessica Williams',
    role: 'Cybersecurity Manager',
    description: 'Manages a team of security professionals and ensures security policies are maintained.',
    imageId: '1573496774379-7b3a7d32d0ae'
  }
];

export default function TeamSection() {
  return (
    <section className="bg-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-12">
          Meet our team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-2/5 h-48 sm:h-auto relative">
                  <Image
                    src={`https://images.unsplash.com/photo-${member.imageId}?w=400&h=400&fit=crop`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                
                <div className="w-full sm:w-3/5 bg-blue-800 p-6 flex flex-col justify-center">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {member.role}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}