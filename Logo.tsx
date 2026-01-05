
import React from 'react';
const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', showText?: boolean }> = ({ size = 'md', showText = true }) => (
  <div className="flex flex-col items-center">
    <div className={`${size === 'lg' ? 'w-20' : 'w-10'} h-10 bg-gradient-to-br from-emerald-400 to-yellow-400 rounded-xl flex items-center justify-center`}>
      <i className="fas fa-dumbbell text-black"></i>
    </div>
    {showText && <h1 className="font-black mt-2">GYM<span className="text-emerald-500">EXPLORE</span></h1>}
  </div>
);
export default Logo;
