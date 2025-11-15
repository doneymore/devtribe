// Helper function to format dates
export function formatPeriod(startDate: string, endDate: string | null, isActive: boolean): string {
  const start = new Date(startDate).toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
  
  if (isActive) {
    return `${start} - Present`;
  }
  
  if (endDate) {
    const end = new Date(endDate).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    return `${start} - ${end}`;
  }
  
  return start;
}