import { UserCircle } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
}

interface Props {
  teamMembers: TeamMember[];
}

export default function TeamSection({ teamMembers }: Props) {
  return (
    <section className="bg-[#E8E8E8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0E508B] mb-8 sm:mb-12">
          Meet our team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* ICON PLACEHOLDER */}
              <div className="w-full h-48 sm:h-52 md:h-56 bg-gray-100 flex items-center justify-center">
                <UserCircle
                  className="text-[#0E508B] opacity-80"
                  size={96}
                  strokeWidth={1.5}
                />
              </div>

              {/* FOOTER */}
              <div className="bg-[#0E508B] p-4 sm:p-5">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed opacity-90">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
