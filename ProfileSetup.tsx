
import React, { useState } from 'react';
import { UserProfile } from './types';
import Logo from './Logo';

const ProfileSetup: React.FC<{ onSave: (p: UserProfile) => void }> = ({ onSave }) => {
  const [name, setName] = useState('');
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <Logo size="lg" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre..." className="w-full max-w-xs bg-slate-900 p-4 rounded-2xl border border-slate-800 mt-8 mb-4" />
      <button onClick={() => onSave({name, email: 'test@test.com', weight: 70, height: 170, goal: 'Fuerza'})} className="w-full max-w-xs bg-emerald-500 text-black font-bold py-4 rounded-2xl">EMPEZAR</button>
    </div>
  );
};
export default ProfileSetup;
