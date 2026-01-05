
import React from 'react';
import { WeeklyRoutine, DAYS_OF_WEEK, MUSCLE_GROUPS, MuscleGroup } from './types';

interface Props { routine: WeeklyRoutine; onUpdateRoutine: (r: WeeklyRoutine) => void; }

const Routines: React.FC<Props> = ({ routine, onUpdateRoutine }) => {
  const toggle = (day: string, group: MuscleGroup) => {
    const current = routine[day] || [];
    const next = current.includes(group) ? current.filter(g => g !== group) : [...current.filter(g => g !== 'Descanso'), group];
    onUpdateRoutine({ ...routine, [day]: next.length ? next : ['Descanso'] });
  };

  return (
    <div className="p-6 max-w-md mx-auto pb-28">
      <h1 className="text-3xl font-black mb-8">Mis Rutinas</h1>
      <div className="space-y-4">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold mb-2">{day}</h3>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS.map(g => (
                <button key={g} onClick={() => toggle(day, g)} className={`text-[10px] px-3 py-1 rounded-full border ${routine[day]?.includes(g) ? 'bg-emerald-500 text-black border-emerald-500' : 'border-slate-700 text-slate-500'}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Routines;
