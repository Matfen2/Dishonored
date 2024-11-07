"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import games from '@/app/data/games.json';
import Link from 'next/link';

const Wallpaper = () => {
  const router = useRouter();

  const handleGameClick = (id) => {
    router.push(`/game/${id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Logo en haut à gauche */}
      <Link href="/">
        <div className="fixed top-4 left-0 z-20" style={{ marginLeft: "-100px", marginTop: "-40px" }}>
          <Image src="/picts/dishonoredLogo.png" alt="logoDishonored" width={320} height={120} />
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
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${window.innerWidth < 768 ? game.mobile : game.present})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>

              {/* Contenu textuel et boutons */}
              <div className="absolute lg:bottom-1/3 lg:left-0  md:left-1/5 bottom-4 z-10 flex flex-col items-center text-center text-white transform md:transform-none -translate-x-1/2">
                <Image src={game.title} alt={`Title for ${game.id}`} width={450} height={250} className="w-full"/>

                <p className="-mt-2 text-2xl font-semibold">{game.pitch}</p>

                <div className="mt-4 flex space-x-4">
                  <a href={game.trailer} target="_blank" rel="noopener noreferrer">
                    <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                      BANDE ANNONCE
                    </button>
                  </a>
                  <button
                    onClick={() => handleGameClick(game.id)}
                    className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
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

export default Wallpaper;
