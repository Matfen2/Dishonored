"use client"; // Indique que ce composant doit être rendu côté client

import React from 'react';
import Wallpaper from './Wallpaper';

const Main = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Wallpaper />
    </div>
  );
};

export default Main;
