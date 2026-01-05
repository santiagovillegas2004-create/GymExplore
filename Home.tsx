
import React, { useState, useEffect } from 'react';
import { WeeklyRoutine, WorkoutSession, UserProfile } from './types';
import WorkoutLogger from './WorkoutLogger';

interface HomeProps {
  routine: WeeklyRoutine;
  profile: UserProfile;
  onSaveWorkout: (session: WorkoutSession) => void;
}

const Home: React.FC<HomeProps> = ({ routine, profile, onSaveWorkout }) => {
  const [showLogger, setShowLogger] = useState(false);
  const [todayDate, setTodayDate] = useState('');
  const [dayName, setDayName] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setTodayDate(now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
    const rawDay = now.toLocaleDateString('es-ES', { weekday: 'long' });
    setDayName(rawDay.charAt(0).toUpperCase() + rawDay.slice(1));
  }, []);

  const todayRoutine = routine[dayName] || ['Descanso'];
  const isRestDay = todayRoutine.includes('Descanso');

  return (
    <div className="p-6 space-y-8 max-w-lg mx-auto pb-28">
      <header>
        <p className="text-emerald-500 font-black uppercase text-[10px]">¡Hola, {profile.name}!</p>
        <h1 className="text-4xl font-black text-white capitalize">{todayDate}</h1>
      </header>

      <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800">
        <h2 className="text-slate-400 text-xs font-bold uppercase mb-4">Hoy toca:</h2>
        <div className="flex flex-wrap gap-2">
          {todayRoutine.map((group, idx) => (
            <span key={idx} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl font-bold border border-emerald-500/20">{group}</span>
          ))}
        </div>
        {!isRestDay && (
          <button onClick={() => setShowLogger(true)} className="mt-8 w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-2">
            <i className="fas fa-dumbbell"></i> COMENZAR
          </button>
        )}
      </div>

      {showLogger && (
        <WorkoutLogger 
          todayGroups={todayRoutine}
          onCancel={() => setShowLogger(false)}
          onSave={(session) => { onSaveWorkout(session); setShowLogger(false); }}
        />
      )}
    </div>
  );
};
export default Home;
