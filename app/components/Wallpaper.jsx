"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import games from '@/app/data/games.json';
import Link from 'next/link';

const Wallpaper = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Détecte si l'utilisateur est sur un petit écran
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Définir la valeur initiale
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGameClick = (slug) => {
    router.push(`/game/${slug}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Logo en haut à gauche */}
      <Link href="/">
        <div className="fixed top-4 left-0 z-20" style={{ marginLeft: "-72px", marginTop: "-35px" }}>
          <Image src="/picts/dishonoredLogo.png" alt="logoDishonored" width={320} height={120} style={{ maxWidth: '220px'}} />
        </div>
      </Link>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet', 
          bulletActiveClass: 'swiper-pagination-bullet-active', 
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${isMobile ? game.mobile : game.present})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Contenu textuel et boutons */}
              <div className="absolute md:top-1/3 md:left-0 bottom-0 left-1/2 z-10 flex flex-col items-center text-center text-white transform md:transform-none -translate-x-1/2 md:-translate-x-0" style={{ width: '80%', maxWidth: '600px' }}>
                <Image src={game.title} alt={`Title for ${game.id}`} width={800} height={350} id='logoTitle' className="w-full max-w-[850px] h-[150px] transition-all duration-300" />

                <div className="mt-0 flex space-x-4 md: mb-12">
                  <a href={game.trailer} target="_blank" rel="noopener noreferrer">
                    <button className="px-3 py-2 border border-white bg-white text-black text-sm rounded-md transition-transform duration-200 hover:scale-105" id='btnInfo'>
                      BANDE ANNONCE
                    </button>
                  </a>
                  <button onClick={() => handleGameClick(game.slug)} className="px-3 py-2 border border-white bg-white text-black text-sm rounded-md transition-transform duration-200 hover:scale-105" id='btnInfo'>
                    EN SAVOIR PLUS
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Style personnalisé pour les points de pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Wallpaper;
