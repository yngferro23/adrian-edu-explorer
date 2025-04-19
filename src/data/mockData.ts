import { Programme } from '../types';

export const mockProgrammesData: Programme[] = [
  {
    programme_name: "Bachelor of Medicine and Surgery",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 45.584,
    cluster: "Medicine and Health Sciences"
  },
  {
    programme_name: "Bachelor of Dental Surgery",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 44.750,
    cluster: "Medicine and Health Sciences"
  },
  {
    programme_name: "Bachelor of Pharmacy",
    university_name: "Jomo Kenyatta University of Agriculture and Technology",
    location: "Kiambu County",
    cutoff_points: 43.872,
    cluster: "Medicine and Health Sciences"
  },
  {
    programme_name: "Bachelor of Science (Aerospace Engineering)",
    university_name: "Jomo Kenyatta University of Agriculture and Technology",
    location: "Kiambu County",
    cutoff_points: 41.341,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Architectural Studies",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 42.990,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Science (Computer Science)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 44.825,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Law",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 42.014,
    cluster: "Law"
  },
  {
    programme_name: "Bachelor of Science (Actuarial Science)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 39.531,
    cluster: "Business and Economics"
  },
  {
    programme_name: "Bachelor of Science (Civil Engineering)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 43.463,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Science (Electrical & Electronic Engineering)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 43.003,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Science (Mechanical Engineering)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 41.835,
    cluster: "Technology and Engineering"
  },
  {
    programme_name: "Bachelor of Science (Nursing)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 43.676,
    cluster: "Medicine and Health Sciences"
  },
  {
    programme_name: "Bachelor of Science (Food Science & Technology)",
    university_name: "Jomo Kenyatta University of Agriculture and Technology",
    location: "Kiambu County",
    cutoff_points: 30.855,
    cluster: "Agriculture and Food Sciences"
  },
  {
    programme_name: "Bachelor of Science (Economics)",
    university_name: "University of Nairobi",
    location: "Nairobi County",
    cutoff_points: 26.096,
    cluster: "Business and Economics"
  },
  {
    programme_name: "Bachelor of Education (Arts)",
    university_name: "Kenyatta University",
    location: "Nairobi County",
    cutoff_points: 33.556,
    cluster: "Education"
  }
];

// Extract unique locations for dropdown
export const uniqueLocations = [...new Set(mockProgrammesData.map(programme => programme.location))];

// Extract unique clusters for filters
export const uniqueClusters = [...new Set(mockProgrammesData.map(programme => programme.cluster))];

// Find min and max cutoff points for range filter
export const minCutoff = 10;
export const maxCutoff = 46;