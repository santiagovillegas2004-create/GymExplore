
import React, { useState } from 'react';
import { LoggedExercise, MuscleGroup, WorkoutSession } from './types';

interface Props { onSave: (s: WorkoutSession) => void; onCancel: () => void; todayGroups: MuscleGroup[]; }

const WorkoutLogger: React.FC<Props> = ({ onSave, onCancel, todayGroups }) => {
  const [exercises, setExercises] = useState<LoggedExercise[]>([]);
  const [name, setName] = useState('');

  const addEx = () => {
    if (!name) return;
    setExercises([...exercises, { id: Date.now().toString(), name, sets: [{ id: '1', weight: 0, reps: 0 }] }]);
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 p-4 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Registrar Entrenamiento</h2>
          <button onClick={onCancel}><i className="fas fa-times"></i></button>
        </div>
        <div className="flex gap-2 mb-6">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ejercicio..." className="flex-1 bg-slate-900 p-3 rounded-xl border border-slate-800" />
          <button onClick={addEx} className="bg-emerald-600 px-4 rounded-xl">+</button>
        </div>
        <div className="space-y-4">
          {exercises.map(ex => (
            <div key={ex.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <p className="font-bold mb-2">{ex.name}</p>
              {ex.sets.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="number" placeholder="Peso" className="w-full bg-slate-800 p-2 rounded" />
                  <input type="number" placeholder="Reps" className="w-full bg-slate-800 p-2 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={() => onSave({id: '1', date: 'hoy', muscleGroups: todayGroups, exercises})} className="w-full bg-emerald-600 py-4 rounded-2xl mt-8 font-bold">FINALIZAR</button>
      </div>
    </div>
  );
};
export default WorkoutLogger;
