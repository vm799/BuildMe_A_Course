
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeMode, Module } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ModuleDetail from './components/ModuleDetail';
import IngestionPipeline from './components/IngestionPipeline';
import LandingPage from './components/LandingPage';
import AdminUploader from './components/AdminUploader';
import { courseData as initialCourseData } from './data/course';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  modules: Module[];
  setModules: (modules: Module[]) => void;
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
  courseTitle: string;
  courseState: typeof initialCourseData;
  updateAsset: (weekNum: number, assetType: string, path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.SOLARPUNK);
  const [isAuth, setIsAuth] = useState(false);
  const [courseState, setCourseState] = useState(initialCourseData);
  
  const initialModules: Module[] = courseState.weeks.map(w => ({
    id: w.weekNumber.toString(),
    course_id: 'c1',
    week_number: w.weekNumber,
    title: w.title,
    description: w.description,
    is_generating: false,
    generation_status: 'completed' as const
  }));

  const [modules, setModules] = useState<Module[]>(initialModules);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(prev => prev === ThemeMode.SOLARPUNK ? ThemeMode.CYBERPUNK : ThemeMode.SOLARPUNK);
  };

  const updateAsset = (weekNum: number, assetType: string, path: string) => {
    setCourseState(prev => ({
      ...prev,
      weeks: prev.weeks.map(w => {
        if (w.weekNumber === weekNum) {
          return {
            ...w,
            assets: {
              ...w.assets,
              [assetType]: {
                ...(w.assets as any)[assetType],
                path: path
              }
            }
          };
        }
        return w;
      })
    }));
  };

  useEffect(() => {
    if (theme === ThemeMode.CYBERPUNK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.body.className = `transition-all duration-1000 ${theme === ThemeMode.CYBERPUNK ? 'bg-[#020a05]' : 'bg-[#e8f5e9]'}`;
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      theme, 
      toggleTheme, 
      modules, 
      setModules, 
      isAuth, 
      setIsAuth,
      courseTitle: courseState.courseTitle,
      courseState,
      updateAsset
    }}>
      <div className={`min-h-screen transition-all duration-700 ${theme === ThemeMode.CYBERPUNK ? 'bg-background-dark text-white' : 'bg-transparent text-slate-900'}`}>
        {theme === ThemeMode.CYBERPUNK && <div className="scanline"></div>}
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={() => { setIsAuth(true); navigate('/dashboard'); }} />} />
          <Route 
            path="/dashboard" 
            element={isAuth ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/module/:id" 
            element={isAuth ? <ModuleDetail /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/generate" 
            element={isAuth ? <IngestionPipeline /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/upload" 
            element={isAuth ? <AdminUploader /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
