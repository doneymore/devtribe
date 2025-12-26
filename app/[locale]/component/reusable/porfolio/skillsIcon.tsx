export function getIconForSkill(skillName: string): React.ReactNode {
  const skillLower = skillName.toLowerCase();
  
  // C# / .NET icons
  if (skillLower.includes('c#') || skillLower.includes('csharp')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="12" width="40" height="40" fill="#00adef" />
        <path
          d="M28 28 L36 28 L36 36 L28 36 Z M36 28 L44 28 L44 36 L36 36 Z M28 36 L36 36 L36 44 L28 44 Z M36 36 L44 36 L44 44 L36 44 Z"
          fill="white"
        />
      </svg>
    );
  }
  
  // .NET / VB.NET / MVC icons
  if (skillLower.includes('.net') || skillLower.includes('vb') || skillLower.includes('mvc')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="12" width="40" height="40" rx="4" fill="#512BD4" />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
        >
          .NET
        </text>
      </svg>
    );
  }
  
  // React icon
  if (skillLower.includes('react')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="16"
          fill="none"
          stroke="#61dafb"
          strokeWidth="3"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="16"
          fill="none"
          stroke="#61dafb"
          strokeWidth="3"
          transform="rotate(60 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="16"
          fill="none"
          stroke="#61dafb"
          strokeWidth="3"
          transform="rotate(120 32 32)"
        />
        <circle cx="32" cy="32" r="6" fill="#61dafb" />
      </svg>
    );
  }
  
  // Angular icon
  if (skillLower.includes('angular')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <polygon points="32 8, 52 20, 48 48, 32 56, 16 48, 12 20" fill="#dd0031" />
        <polygon points="32 8, 52 20, 48 48, 32 56" fill="#c3002f" />
        <polygon points="32 16, 24 40, 28 40, 32 28, 36 40, 40 40" fill="white" />
      </svg>
    );
  }
  
  // Blazor icon
  if (skillLower.includes('blazor')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="12" width="40" height="40" rx="4" fill="#512BD4" />
        <path d="M32 20 L44 32 L32 44 L20 32 Z" fill="#FFB900" />
        <circle cx="32" cy="32" r="6" fill="white" />
      </svg>
    );
  }
  
  // JavaScript icon
  if (skillLower.includes('javascript') || skillLower.includes('js')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="12" width="40" height="40" rx="4" fill="#f0db4f" />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="#323330"
          fontSize="28"
          fontWeight="bold"
        >
          JS
        </text>
      </svg>
    );
  }
  
  // Default/Generic icon
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="#1e3a8a" />
      <rect x="20" y="20" width="10" height="10" fill="white" />
      <rect x="34" y="20" width="10" height="10" fill="white" />
      <rect x="20" y="34" width="10" height="10" fill="white" />
      <path d="M34 39 L44 34 L44 44 Z" fill="white" />
    </svg>
  );
}
