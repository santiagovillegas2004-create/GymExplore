
import React, { useState } from 'react';
import { UserProfile } from './types';
import Logo from './Logo';

interface ProfileSetupProps {
  onSave: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState<UserProfile['goal']>('Ganar músculo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !weight || !height) {
      alert("Por favor, rellena todos los campos");
      return;
    }
    
    onSave({
      name,
      email,
      weight: parseFloat(weight),
      height: parseFloat(height),
      goal
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="text-slate-400 mt-4 font-medium uppercase tracking-widest text-[10px]">Configura tu perfil de atleta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Nombre</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ej: Marc Ferrer" 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="atleta@gmail.com" 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Peso (kg)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
                placeholder="75" 
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Altura (cm)</label>
              <input 
                type="number" 
                value={height} 
                onChange={e => setHeight(e.target.value)} 
                placeholder="180" 
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Objetivo</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Ganar músculo', 'Perder peso', 'Mantenerse', 'Fuerza'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`py-3 px-2 rounded-xl text-[10px] font-black transition-all border uppercase ${
                    goal === g 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500' 
                      : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl shadow-xl shadow-emerald-500/10 hover:bg-emerald-400 active:scale-95 transition-all text-lg uppercase tracking-widest mt-4"
          >
            COMENZAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
