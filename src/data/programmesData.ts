import { Programme } from '../types';

// Function to parse CSV string
function parseCSV(csvText: string) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
}

// Import CSV file content
const csvContent = await fetch(new URL('./programmes/full_degree_cutoffs_2017_to_2023_with_prog_code.csv', import.meta.url))
  .then(response => response.text());

// Parse CSV data
const records = parseCSV(csvContent);

// Transform CSV data to Programme type
export const programmesData: Programme[] = records.map((record: Record<string, string>) => {
  const cutoff2023 = parseFloat(record['Cut-off 2023']);
  console.log(`Programme: ${record['Programme Name']}, 2023 Cut-off: ${cutoff2023}`);
  
  return {
    programme_name: record['Programme Name'],
    university_name: record['University Name'],
    location: record['Location'],
    cutoff_points: cutoff2023,
    cluster: determineCluster(record['Programme Name']),
    programme_code: record['Programme Code']
  };
});

// Helper function to determine cluster based on programme name
function determineCluster(programmeName: string): string {
  const name = programmeName.toLowerCase();
  
  if (name.includes('medicine') || name.includes('pharmacy') || name.includes('nursing') || 
      name.includes('dental') || name.includes('clinical')) {
    return 'Medicine and Health Sciences';
  }
  if (name.includes('engineering') || name.includes('technology') || name.includes('computer') || 
      name.includes('architecture') || name.includes('construction')) {
    return 'Technology and Engineering';
  }
  if (name.includes('business') || name.includes('commerce') || name.includes('economics') || 
      name.includes('accounting') || name.includes('finance') || name.includes('actuarial')) {
    return 'Business and Economics';
  }
  if (name.includes('education') || name.includes('teaching')) {
    return 'Education';
  }
  if (name.includes('law') || name.includes('legal')) {
    return 'Law';
  }
  if (name.includes('agriculture') || name.includes('food') || name.includes('environment')) {
    return 'Agriculture and Food Sciences';
  }
  if (name.includes('arts') || name.includes('music') || name.includes('design') || 
      name.includes('media') || name.includes('communication')) {
    return 'Arts and Humanities';
  }
  if (name.includes('science') && !name.includes('computer') && !name.includes('actuarial')) {
    return 'Pure Sciences';
  }
  
  return 'Other';
}

// Extract unique locations for dropdown
export const uniqueLocations = [...new Set(programmesData.map(programme => programme.location))];

// Extract unique clusters for filters
export const uniqueClusters = [...new Set(programmesData.map(programme => programme.cluster))];

// Set cut-off points range based on 2023 data
const allCutoffs = programmesData.map(p => p.cutoff_points);
export const minCutoff = Math.floor(Math.min(...allCutoffs));
export const maxCutoff = Math.ceil(Math.max(...allCutoffs));

console.log(`Cut-off range for 2023: ${minCutoff} to ${maxCutoff}`); 