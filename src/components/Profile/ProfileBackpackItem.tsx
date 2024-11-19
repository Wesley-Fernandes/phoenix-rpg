import React from 'react';

export function ProfileBackpackItem({ id }: { id: string }) {
  return (
    <div className="border p-1 h-24 w-24">
      <img
        src="https://i.pinimg.com/564x/f1/8d/f0/f18df0144f3ba4ee0a3db8e2ebc278c6.jpg"
        alt="item-picture"
        className="w-full h-full object-cover"
      />
      <div className="relative bottom-5 left-[4.5rem] bg-red-600 h-8 w-8 border-2 border-red-800 rounded-full flex items-center justify-center">
        <span>1</span>
      </div>
    </div>
  );
}
