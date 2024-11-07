"use client"; // Indique que ce composant doit être rendu côté client

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import games from "@/app/data/games.json";

const GamePage = () => {
  const { id } = useParams();
  const game = games.find((game) => game.id === id);

  // Définissez une valeur par défaut pour l'image sélectionnée
  const defaultImage = game && game.wallpaper ? game.wallpaper[0] : "";
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [showFirstSet, setShowFirstSet] = useState(true);

  const handleToggleImages = () => {
    setShowFirstSet(!showFirstSet);
  };

  // Ajoutez cette vérification après l'initialisation des hooks
  if (!game) {
    return <div>Jeu non trouvé</div>;
  }

  return (
    <div className="game">
      {/* Section PRESENT */}
      <div className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${game.imgGame})` }}>
        <Link href="/">
          <div className="fixed top-4 left-0 z-20" style={{ marginLeft: "-100px", marginTop: "-40px" }}>
            <Image src="/picts/dishonoredLogo.png" alt="logoDishonored" width={320} height={120} />
          </div>
        </Link>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
            <a href={game.gameplay} target="_blank" rel="noopener noreferrer">
              GAMEPLAY
            </a>
          </button>
          <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
            <a href="#buy">ACHETER</a>
          </button>
        </div>
      </div>

      {/* Section JACKET */}
      <div className="bg-black p-10 grid grid-cols-3 gap-4 text-white">
        {game.jacket.imgJacket.map((img, index) => (
          <div key={index} className="text-center">
            <Image src={img} alt={`jacket ${index}`} width={400} height={200} className="d-block m-auto rounded-2xl" />
            <h3 className="text-lg font-semibold mt-4">{game.jacket.pitchJacket[index]}</h3>
            <p className="text-1xl mt-2">{game.jacket.sentenceJacket[index]}</p>
          </div>
        ))}
      </div>

      {/* Section POWERS */}
      <div 
        className="bg-gray-800 p-10 text-white flex flex-col items-center relative" 
        style={{ backgroundImage: `url(${game.abilities.void})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="grid grid-cols-4 gap-6 relative z-10">
          {/* Image du personnage à gauche */ }
          <div className="col-span-1 flex justify-center items-center">
            <Image src={game.abilities.characters[0]} alt="Character" width={140} height={100} className="rounded-md" />
          </div>

          {/* Icônes des pouvoirs */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {game.abilities.powers.map((power, index) => (
              <div key={index} className="flex justify-center items-center">
                <Image src={power} alt={`Power ${index}`} width={120} height={100} className="rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section GAMEPLAY */}
      <div className="flex justify-center items-center bg-black py-10">
        <div className="grid grid-cols-5 gap-4">
          {/* Image principale */}
          <div className="col-span-4 flex justify-center">
            <Image 
              src={selectedImage} 
              alt="Selected Wallpaper" 
              width={1200} 
              height={40} 
              className="rounded-lg"
            />
          </div>

          {/* Galerie des miniatures avec flèches en haut et en bas */}
          <div className="col-span-1 flex flex-col items-center space-y-4 relative mt-4">
            {/* Flèche du haut */}
            <button 
              onClick={handleToggleImages} 
              className="text-white text-3xl focus:outline-none mb-2"
              style={{ visibility: showFirstSet ? 'hidden' : 'visible' }} 
            >
              <i className="fa-solid fa-chevron-up"></i>
            </button>

            {/* Miniatures d'images */}
            {(showFirstSet ? game.wallpaper.slice(0, 3) : game.wallpaper.slice(3, 6)).map((image, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedImage(image)} 
                className="cursor-pointer"
                style={{ opacity: selectedImage === image ? '1.0' : '0.5' }} 
              >
                <Image 
                  src={image} 
                  alt={`Thumbnail ${index}`} 
                  width={300} 
                  height={104} 
                  className="rounded-lg"
                />
              </div>
            ))}

            {/* Flèche du bas */}
            <button 
              onClick={handleToggleImages} 
              className="text-white text-3xl focus:outline-none mt-2"
              style={{ visibility: showFirstSet ? 'visible' : 'hidden' }} 
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Section BUY */}
      <div 
        className="bg-gray-800 p-10 text-white flex flex-col items-center relative" id='buy' 
        style={{ backgroundImage: `url(${game.buy.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className='z-20 flex flex-row items-center space-x-6'>
          <Image src={game.buy.jacket} alt="Buy Jacket" width={250} height={400} className="rounded-lg" />
          
          <div className="flex flex-col max-w-2xl">
            <p className="text-xl">{game.buy.description}</p>
            <div className="mt-6 flex space-x-4">
              <a href={game.buy.hrefBuy.playstation} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md"><i className="fa-brands fa-playstation" style={{marginRight: '10px'}}></i>PLAYSTATION</button>
              </a>
              <a href={game.buy.hrefBuy.xbox} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md"><i className="fa-brands fa-xbox" style={{marginRight: '10px'}}></i>XBOX ONE</button>
              </a>
              <a href={game.buy.hrefBuy.steam} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-md"><i className="fa-brands fa-steam-symbol" style={{marginRight: '10px'}}></i>STEAM</button>
              </a>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default GamePage;
