"use client";  // Indique que ce composant doit être rendu côté client

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import games from '../../app/data/games.json'; 
import Link from 'next/link';

const Main = () => {
  const router = useRouter();

  const gameClick = (id) => {
    router.push(`/games/${id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Logo placé vraiment en haut à gauche */}
      <Link href="/">
        <div className="fixed top-4 left-0 z-20" style={{ marginLeft: "-100px", marginTop: "-40px" }}>
          <Image src="/picts/dishonoredLogo.png" alt="logoDishonored" width={320} height={120} />
        </div>
      </Link>


      <Swiper
        spaceBetween={0} // Supprime l'espacement entre les slides
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${game.present})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>

              <div className="relative z-10 flex flex-col items-center text-center text-white max-w-lg">
                <Image src={game.title} alt={`titleDishonored ${game.id}`} width={500} height={200} />
                <p className="mt-4 text-2xl font-semibold uppercase">{game.pitch}</p>
                <div className="mt-6 flex space-x-4">
                  <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                    <a href={game.trailer} target="_blank" rel="noopener noreferrer">
                      BANDE ANNONCE
                    </a>
                  </button>
                  <button
                    className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
                    onClick={() => gameClick(game.id)}
                  >
                    EN SAVOIR PLUS
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Main;
