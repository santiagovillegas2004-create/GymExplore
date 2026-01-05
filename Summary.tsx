
import React, { useState, useEffect } from 'react';
import { WorkoutSession } from './types';
import { getWorkoutInsights } from './geminiService';

const Summary: React.FC<{ history: WorkoutSession[] }> = ({ history }) => {
  const [insight, setInsight] = useState('');
  
  useEffect(() => {
    if (history.length > 0) {
      getWorkoutInsights(history).then(setInsight);
    }
  }, [history]);

  return (
    <div className="p-6 max-w-md mx-auto pb-28">
      <h1 className="text-3xl font-black mb-8">Resumen</h1>
      {insight && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl mb-6 italic text-sm text-emerald-300">
          <i className="fas fa-robot mr-2"></i> "{insight}"
        </div>
      )}
      {history.length === 0 ? <p className="text-slate-500">Aún no has entrenado.</p> : (
        <div className="space-y-4">
          {[...history].reverse().map(s => (
            <div key={s.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <p className="font-bold text-white">{s.date}</p>
              <p className="text-emerald-500 text-xs uppercase font-black">{s.muscleGroups.join(', ')}</p>
              <div className="mt-2 text-xs text-slate-400">
                {s.exercises.map(ex => (
                    <div key={ex.id} className="flex justify-between">
                        <span>{ex.name}</span>
                        <span>{ex.sets.length} series</span>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Summary;
