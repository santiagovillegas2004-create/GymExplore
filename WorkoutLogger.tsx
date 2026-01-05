
import React, { useState } from 'react';
import { LoggedExercise, MuscleGroup, WorkoutSession, ExerciseSet } from './types';

interface Props { 
  onSave: (s: WorkoutSession) => void; 
  onCancel: () => void; 
  todayGroups: MuscleGroup[]; 
}

const WorkoutLogger: React.FC<Props> = ({ onSave, onCancel, todayGroups }) => {
  const [exercises, setExercises] = useState<LoggedExercise[]>([]);
  const [name, setName] = useState('');

  const addEx = () => {
    if (!name.trim()) return;
    const newEx: LoggedExercise = { 
      id: Date.now().toString(), 
      name: name.trim(), 
      sets: [{ id: Date.now().toString() + '-0', weight: 0, reps: 0 }] 
    };
    setExercises([...exercises, newEx]);
    setName('');
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, { id: Date.now().toString(), weight: lastSet?.weight || 0, reps: lastSet?.reps || 0 }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exId: string, setId: string, field: 'weight' | 'reps', val: string) => {
    const numVal = parseFloat(val) || 0;
    setExercises(exercises.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: numVal } : s)
        };
      }
      return ex;
    }));
  };

  const removeEx = (id: string) => setExercises(exercises.filter(ex => ex.id !== id));

  const handleFinish = () => {
    if (exercises.length === 0) {
      alert("Añade al menos un ejercicio");
      return;
    }
    const session: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
      muscleGroups: todayGroups,
      exercises
    };
    onSave(session);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 p-4 overflow-y-auto pb-32">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-center py-4 sticky top-0 bg-slate-950 z-10 border-b border-slate-900">
          <div>
            <h2 className="text-xl font-black text-white">SESIÓN</h2>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{todayGroups.join(' & ')}</p>
          </div>
          <button onClick={onCancel} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nuevo Ejercicio</label>
          <div className="flex gap-2">
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ej: Press de banca..." 
              className="flex-1 bg-slate-800 p-3 rounded-xl border-none text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500" 
            />
            <button 
              onClick={addEx} 
              className="bg-emerald-600 w-12 rounded-xl text-slate-950 font-black flex items-center justify-center hover:bg-emerald-500"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {exercises.map(ex => (
            <div key={ex.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 relative shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-white uppercase tracking-tight">{ex.name}</h3>
                <button onClick={() => removeEx(ex.id)} className="text-slate-600 hover:text-red-500">
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[8px] font-black text-slate-600 uppercase mb-1">
                  <div className="col-span-2 text-center">Set</div>
                  <div className="col-span-5 text-center">Peso (kg)</div>
                  <div className="col-span-5 text-center">Reps</div>
                </div>
                {ex.sets.map((s, idx) => (
                  <div key={s.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-2 text-center text-[10px] font-bold text-slate-500">{idx + 1}</div>
                    <div className="col-span-5">
                      <input 
                        type="number" 
                        value={s.weight || ''} 
                        onChange={e => updateSet(ex.id, s.id, 'weight', e.target.value)}
                        className="w-full bg-slate-800 p-2.5 rounded-xl border-none text-center text-white font-bold focus:ring-2 focus:ring-emerald-500" 
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-5">
                      <input 
                        type="number" 
                        value={s.reps || ''} 
                        onChange={e => updateSet(ex.id, s.id, 'reps', e.target.value)}
                        className="w-full bg-slate-800 p-2.5 rounded-xl border-none text-center text-white font-bold focus:ring-2 focus:ring-emerald-500" 
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => addSet(ex.id)}
                className="w-full mt-4 py-3 border border-dashed border-slate-700 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-800/50 hover:text-white transition-all uppercase tracking-widest"
              >
                + Añadir Serie
              </button>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-lg border-t border-slate-900">
          <button 
            onClick={handleFinish} 
            className="w-full max-w-md mx-auto bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-emerald-400 active:scale-95 transition-all"
          >
            <i className="fas fa-check-circle"></i> FINALIZAR ENTRENAMIENTO
          </button>
        </div>
      </div>
    </div>
  );
};
export default WorkoutLogger;
