import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageId: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Chief Information Security Officer (CISO)',
    imageId: '1560250097-0b93528c311a'
  },
  {
    id: 2,
    name: 'Sarah',
    role: 'Penetration Testers (Ethical Hackers)',
    imageId: '1573496359-ca8253c6f948'
  },
  {
    id: 3,
    name: 'Joy',
    role: 'Security Architects',
    imageId: '1573497019940-1c28c88b4f3e'
  },
  {
    id: 4,
    name: 'Matthew',
    role: 'Security Engineers',
    imageId: '1556157382-97eda605d2f9'
  },
  {
    id: 5,
    name: 'Anna',
    role: 'Cybersecurity Manager',
    imageId: '1573496774379-7b3a7d32d0ae'
  },
  {
    id: 6,
    name: 'Martha',
    role: 'Cybersecurity Analysts',
    imageId: '1580489944761-15a19d654956'
  }
];

export default function TeamSection() {
  return (
    <section className="bg-[#E8E8E8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0E508B] mb-8 sm:mb-12">
          Meet our team
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="w-full h-48 sm:h-52 md:h-56 relative bg-gray-200">
                <img
                  src={`https://images.unsplash.com/photo-${member.imageId}?w=600&h=400&fit=crop&crop=faces`}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Blue Footer Section */}
              <div className="bg-[#0E508B] p-4 sm:p-5">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">
                  {member.name}
                </h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed opacity-90">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}