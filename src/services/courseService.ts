import { promises as fs } from 'fs';
import path from 'path';

// TypeScript interfaces for our course data
interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  deckUrl?: string;
  imageUrl?: string;
  status: 'complete' | 'in-progress' | 'pending';
}

interface CourseData {
  title: string;
  description: string;
  instructor: string;
  modules: CourseModule[];
}

// Server-like service for course data (Node.js environment)
export async function getCourseData(): Promise<CourseData> {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'course.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read course data:', error);
    // Return fallback data structure
    return {
      title: "AI SecOps Course",
      description: "Building secure AI systems",
      instructor: "AI Security Team",
      modules: []
    };
  }
}

// Type-safe module data checker
export function validateModule(module: CourseModule): boolean {
  return !!(module.id && module.title && module.description);
}

// Asset existence checker
export async function checkAssetExists(assetPath: string): Promise<boolean> {
  try {
    const fullPath = path.join(process.cwd(), 'public', assetPath);
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

// Update course data (for Admin Hub)
export async function updateCourseData(newData: CourseData): Promise<boolean> {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'course.json');
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to update course data:', error);
    return false;
  }
}