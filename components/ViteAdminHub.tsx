import React, { useState, useEffect } from 'react';

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

const ViteAdminHub: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "AI SecOps Course",
    description: "Building secure AI systems",
    instructor: "AI Security Team",
    modules: []
  });
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    duration: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('courseData');
    if (savedData) {
      try {
        setCourseData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved course data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever courseData changes
  useEffect(() => {
    localStorage.setItem('courseData', JSON.stringify(courseData));
  }, [courseData]);

  const handleAddModule = () => {
    if (!newModule.title.trim() || !newModule.description.trim()) {
      setStatusMessage('Please fill in all required fields');
      return;
    }

    const module: CourseModule = {
      id: `module-${Date.now()}`,
      title: newModule.title,
      description: newModule.description,
      duration: newModule.duration || '0 min',
      status: 'pending'
    };

    setCourseData(prev => ({
      ...prev,
      modules: [...prev.modules, module]
    }));

    setNewModule({ title: '', description: '', duration: '' });
    setStatusMessage('Module added successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(courseData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'course.json';
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Course data exported! Save this file to your repository.');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all course data?')) {
      const defaultData: CourseData = {
        title: "AI SecOps Course",
        description: "Building secure AI systems",
        instructor: "AI Security Team",
        modules: []
      };
      setCourseData(defaultData);
      setStatusMessage('Course data reset to defaults');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🛠️ Vite Admin Hub</h1>
        
        {/* Status Messages */}
        {statusMessage && (
          <div className="mb-6 p-4 bg-blue-600 rounded-lg text-center">
            {statusMessage}
          </div>
        )}

        {/* Course Info Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Course Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={courseData.title}
                onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={courseData.instructor}
                onChange={(e) => setCourseData(prev => ({ ...prev, instructor: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <textarea
                placeholder="Course Description"
                value={courseData.description}
                onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 h-24"
              />
            </div>
          </div>

          {/* Add New Module */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Module</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Module Title"
                value={newModule.title}
                onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 15 min)"
                value={newModule.duration}
                onChange={(e) => setNewModule(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <textarea
                placeholder="Module Description"
                value={newModule.description}
                onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 h-24"
              />
              <button
                onClick={handleAddModule}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>

        {/* Current Modules */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Modules ({courseData.modules.length})</h2>
          <div className="space-y-3">
            {courseData.modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-gray-400 text-sm">{module.description}</p>
                  <span className="text-xs text-gray-500">{module.duration}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  module.status === 'complete' ? 'bg-green-500' :
                  module.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-600'
                }`}>
                  {module.status}
                </span>
              </div>
            ))}
            {courseData.modules.length === 0 && (
              <p className="text-gray-400 text-center py-8">No modules added yet</p>
            )}
          </div>
        </div>

        {/* Export Controls */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Deployment Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              📤 Export Course Data (JSON)
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🗑️ Reset to Defaults
            </button>
          </div>
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Deployment Instructions:</h3>
            <ol className="list-decimal list-inside text-sm space-y-1 text-gray-300">
              <li>Click "Export Course Data" to download your course.json file</li>
              <li>Save this file to your project's <code className="bg-gray-600 px-2 py-1 rounded">public/data/</code> folder</li>
              <li>Commit and push to your repository</li>
              <li>Deploy to Vercel - your changes will be live!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViteAdminHub;