import { useState, useEffect } from 'react';

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

export const useCourseData = () => {
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/course.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Failed to load course data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course data');
        // Fallback data
        setData({
          title: "AI SecOps Course",
          description: "Building secure AI systems",
          instructor: "AI Security Team",
          modules: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, []);

  return { data, loading, error };
};

// Hook for testing asset loading
export const useAssetTester = () => {
  const [assets, setAssets] = useState({
    video: { exists: false, loading: true },
    pdf: { exists: false, loading: true },
    image: { exists: false, loading: true }
  });

  useEffect(() => {
    const testAssets = async () => {
      try {
        // Test video
        const videoResponse = await fetch('/videos/test.mp4');
        setAssets(prev => ({
          ...prev,
          video: { exists: videoResponse.ok, loading: false }
        }));

        // Test PDF
        const pdfResponse = await fetch('/decks/test.pdf');
        setAssets(prev => ({
          ...prev,
          pdf: { exists: pdfResponse.ok, loading: false }
        }));

        // Test image
        const imageResponse = await fetch('/images/test.png');
        setAssets(prev => ({
          ...prev,
          image: { exists: imageResponse.ok, loading: false }
        }));
      } catch (error) {
        console.error('Asset testing failed:', error);
        setAssets({
          video: { exists: false, loading: false },
          pdf: { exists: false, loading: false },
          image: { exists: false, loading: false }
        });
      }
    };

    testAssets();
  }, []);

  return assets;
};