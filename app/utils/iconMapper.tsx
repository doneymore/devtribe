// Helper function to map icon names from API to component icon names
export function mapServiceIconName(apiIconName: string): string {
  // Map API icon names to Lucide icon names
  const iconMapping: Record<string, string> = {
    "ico-scpt-yyhg": "ShieldAlert",
    "incident-response": "ShieldAlert",
    "digital-forensics": "Search",
    "reporting-compliance": "FileCheck",
    "training-awareness": "Radio",
    "security": "Shield",
    "encryption": "Lock",
    "monitoring": "Eye",
    "server": "Server",
  };

  return iconMapping[apiIconName.toLowerCase()] || "Shield"; // Default to Shield icon
}

// Helper function to map color names to hex codes
export function mapServiceColor(colorName: string): string {
  const colorMapping: Record<string, string> = {
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#10B981",
    yellow: "#F59E0B",
    purple: "#8B5CF6",
    pink: "#EC4899",
    orange: "#FB923C",
    magenta: "#D946EF",
    cyan: "#06B6D4",
    indigo: "#6366F1",
  };

  return colorMapping[colorName.toLowerCase()] || "#3B82F6"; // Default to blue
}