/**
 * File existence checker for the AI SecOps course application
 * Checks if files exist in the public directory structure
 */

// Since we're in a browser environment, we'll simulate file checking
// In a real server environment, this would use fs.existsSync
export const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    // Remove leading slash for fetch requests
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    
    // Attempt to fetch the file to check if it exists
    const response = await fetch(`/${cleanPath}`, { 
      method: 'HEAD',
      cache: 'no-cache'
    });
    
    return response.ok;
  } catch (error) {
    console.warn(`Could not verify file existence for ${filePath}:`, error);
    return false;
  }
};

// Check multiple files at once
export const checkMultipleFiles = async (filePaths: string[]): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {};
  
  // Run all checks in parallel for better performance
  const promises = filePaths.map(async (path) => {
    results[path] = await checkFileExists(path);
  });
  
  await Promise.all(promises);
  return results;
};

// Get standardized file path based on week and format
export const getStandardizedPath = (week: number, format: string, extension: string): string => {
  const folderMap: Record<string, string> = {
    video: 'videos',
    slides: 'decks', 
    infographic: 'images',
    quiz: 'assets'
  };
  
  const labelMap: Record<string, string> = {
    video: 'video',
    slides: 'deck',
    infographic: 'schema',
    quiz: 'artifact'
  };
  
  const folder = folderMap[format] || 'assets';
  const label = labelMap[format] || 'asset';
  
  return `/public/${folder}/week${week}-${label}.${extension}`;
};

// Validate if a path follows the standardized naming convention
export const isValidStandardizedPath = (path: string): boolean => {
  const standardizedPattern = /^\/public\/(videos|decks|images|assets)\/week[1-4]-(video|deck|schema|artifact)\.(mp4|pdf|png|jpg|jpeg|gif|webp)$/;
  return standardizedPattern.test(path);
};