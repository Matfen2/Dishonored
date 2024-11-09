"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import games from "@/app/data/games.json";

const GamePage = () => {
  const { id } = useParams();
  const game = games.find((game) => game.id === id);
  const [selectedImage, setSelectedImage] = useState(game.wallpaper[0]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  if (!game) {
    return <div>Jeu non trouvé</div>;
  }

  return (
    <div className="game">
      {/* Section PRESENT */}
      <div className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${game.imgGame})` }}>
        <Link href="/">
        <div className="fixed top-4 left-0 z-20" style={{ marginLeft: "-72px", marginTop: "-35px" }}>
          <Image src="/picts/dishonoredLogo.png" alt="logoDishonored" width={320} height={120} style={{ maxWidth: '220px'}} />
        </div>
      </Link>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 text-center">
          <a href={game.gameplay} target="_blank" rel="noopener noreferrer"  className="px-3 py-2 border border-white bg-white text-black text-sm rounded-md transition-transform duration-200 hover:scale-105" id="hrefBuy">
            GAMEPLAY
          </a>
          <a href="#buy" className="px-3 py-2 border border-white bg-white text-black text-sm rounded-md transition-transform duration-200 hover:scale-105" id="hrefBuy">
            ACHETER
          </a>
        </div>
      </div>

      {/* Section JACKET */}
      <div className="bg-black p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        {game.jacket.imgJacket.map((img, index) => (
          <div key={index} className="text-center px-4 md: py-4">
            <Image src={img} alt={`jacket ${index}`} width={500} height={200} className="mx-auto rounded-2xl w-full" />
            <h3 className="text-lg font-semibold mt-4 mb-2 md:mb-1" id="pitchJacket">{game.jacket.pitchJacket[index]}</h3>
            <p className="text-sm md:max-w-xs mx-auto leading-relaxed" id="sentenceJacket">{game.jacket.sentenceJacket[index]}</p>
          </div>
        ))}
      </div>

      {/* Section GAMEPLAY */}
      <div className="bg-black py-6 md:py-10 px-4 -mt-8">
      {/* Image principale */}
      <div className="flex justify-center mb-4">
        <Image 
          src={selectedImage} 
          alt="Selected Wallpaper" 
          width={800} 
          height={600} 
          id="mainGameplay"
          className="rounded-lg w-full"
          style={{maxWidth: '900px'}}
        />
      </div>

      {/* Swiper pour les miniatures avec navigation */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3} 
        navigation={true} 
        modules={[Navigation]}
        className="max-w-4xl mx-auto"
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
          1440: {
            slidesPerView: 6,
          },
        }}
      >
        {game.wallpaper.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer"
              style={{ opacity: selectedImage === image ? "1.0" : "0.5" }}
            >
              <Image 
                src={image} 
                alt={`Thumbnail ${index}`} 
                width={300} 
                height={150} 
                className="rounded-lg w-full transition-transform duration-200 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* Section BUY */}
      <div
        className="bg-gray-800 p-6 md:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center relative"
        id="buy"
        style={{
          backgroundImage: `url(${game.buy.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay pour obscurcir l'arrière-plan */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 flex flex-col justify-center md:flex-row items-center space-x-0 md:space-x-6 lg:space-x-8 w-full">
          {/* Image du jeu */}
          <Image
            src={game.buy.jacket}
            alt="Buy Jacket"
            width={200}
            height={300}
            id="jacket"
            className="rounded-lg w-full md:w-[400px] lg:w-[250px] mb-4 md:mb-0"
          />

          {/* Description et Boutons */}
          <div className="flex flex-col max-w-2xl text-center md:text-left px-4 md:px-0">
            <p className="text-base md:text-lg lg:text-xl -mb-2 md:mb-0" id="synopsis">
              {game.buy.description}
            </p>
            <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 justify-center md:justify-start">
              <a href={game.buy.hrefBuy.playstation} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 text-white rounded-md md: mt-2 transition-transform duration-200 hover:scale-105" id="btnPlaystation">
                  <i className="fa-brands fa-playstation mr-2"></i>PLAYSTATION
                </button>
              </a>
              <a href={game.buy.hrefBuy.xbox} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 text-white rounded-md md: mt-2 transition-transform duration-200 hover:scale-105" id="btnXbox">
                  <i className="fa-brands fa-xbox mr-2"></i>XBOX
                </button>
              </a>
              <a href={game.buy.hrefBuy.steam} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 text-white rounded-md md: mt-2 transition-transform duration-200 hover:scale-105" id="btnSteam">
                  <i className="fa-brands fa-steam-symbol mr-2"></i>STEAM
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
