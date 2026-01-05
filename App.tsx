
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Routines from './components/Routines';
import Summary from './components/Summary';
import ProfileSetup from './components/ProfileSetup';
import Logo from './components/Logo';
import { WeeklyRoutine, WorkoutSession, UserProfile } from './types';

const INITIAL_ROUTINE: WeeklyRoutine = {
  Lunes: ['Pecho', 'Tríceps'],
  Martes: ['Espalda', 'Bíceps'],
  Miércoles: ['Descanso'],
  Jueves: ['Piernas', 'Hombros'],
  Viernes: ['Cardio'],
  Sábado: ['Descanso'],
  Domingo: ['Descanso']
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'routines' | 'summary'>('home');
  const [routine, setRoutine] = useState<WeeklyRoutine>(INITIAL_ROUTINE);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRoutine = localStorage.getItem('gymexplore_routine');
    const savedHistory = localStorage.getItem('gymexplore_history');
    const savedProfile = localStorage.getItem('gymexplore_profile');
    
    if (savedRoutine) setRoutine(JSON.parse(savedRoutine));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    
    setLoading(false);
  }, []);

  const saveRoutine = (newRoutine: WeeklyRoutine) => {
    setRoutine(newRoutine);
    localStorage.setItem('gymexplore_routine', JSON.stringify(newRoutine));
  };

  const saveWorkout = (session: WorkoutSession) => {
    const newHistory = [...history, session];
    setHistory(newHistory);
    localStorage.setItem('gymexplore_history', JSON.stringify(newHistory));
    setActiveTab('summary');
  };

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('gymexplore_profile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('gymexplore_profile');
      setProfile(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <Logo size="md" showText={false} />
      <i className="fas fa-circle-notch fa-spin text-emerald-500 text-3xl"></i>
    </div>
  );

  if (!profile) {
    return <ProfileSetup onSave={saveProfile} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home routine={routine} profile={profile} onSaveWorkout={saveWorkout} />;
      case 'routines':
        return <Routines routine={routine} onUpdateRoutine={saveRoutine} />;
      case 'summary':
        return <Summary history={history} />;
      default:
        return <Home routine={routine} profile={profile} onSaveWorkout={saveWorkout} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      {/* App Bar */}
      <nav className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 sticky top-0 z-40 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <span className="text-xl font-black text-white tracking-tighter uppercase flex">
            Gym<span className="logo-gradient-text">Explore</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{profile.name}</p>
            <p className="text-[8px] text-slate-500 uppercase font-bold">{profile.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-9 h-9 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center hover:border-red-500/50 transition-all group"
          >
             <i className="fas fa-sign-out-alt text-slate-600 text-xs group-hover:text-red-500"></i>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect-dark px-8 py-4 flex justify-between items-center z-40">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <i className="fas fa-house-fire text-xl"></i>
          <span className="text-[10px] font-bold uppercase tracking-widest">Inicio</span>
        </button>
        <button 
          onClick={() => setActiveTab('routines')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'routines' ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <i className="fas fa-calendar-day text-xl"></i>
          <span className="text-[10px] font-bold uppercase tracking-widest">Rutinas</span>
        </button>
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'summary' ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <i className="fas fa-chart-simple text-xl"></i>
          <span className="text-[10px] font-bold uppercase tracking-widest">Resumen</span>
        </button>
      </div>
    </div>
  );
};

export default App;
