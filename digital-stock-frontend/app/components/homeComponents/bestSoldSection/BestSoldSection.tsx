"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import { useAppState } from "@/app/store/BackendAPIState";
import { useEffect, useRef, useState } from "react";
import { ProductInterface } from "@/app/utils/Types";
import { useRouter } from "next/navigation";

const BestSoldSection = () => {
  const { productList } = useAppState();
  const [bestSold, setBestSold] = useState<ProductInterface[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (bestSold.length == 0) {
      const topTen = [...productList]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 10);

      setBestSold(topTen);
    }
  }, [productList]);

  return (
    <section className="pt-6 bg-white pb-6 mb-12">
      <div className="lg:mx-auto w-full">
        <div className="pb-6 pt-3  shadow-inner border-t border-gray-200">
          <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-loose pb-2.5">
            Best sold
          </h2>
          <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">
            Explore the essence of technology with our most popular products.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center mx-3  pt-12 bg-white">

          
          <div
            ref={(node) => setPrevEl(node)}
            className="bg-white border-2 text-white px-2 py-2 rounded-r"
          >
            <svg
              className="h-6 w-6 rotate-180 text-gray-900"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
          
          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            effect={"coverflow"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            spaceBetween={10}
            slidesPerView={3}
            centeredSlides={true}
            parallax={true}
            coverflowEffect={{
              rotate: 0,
              scale: 0.7,
              slideShadows: false,
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            className="coverflow"
          >
            {bestSold.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div>
                  <img
                    className="p-3 bg-white"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  {activeIndex === index && (
                  <div className="py-4 border-y">
                    <h3 className="w-full text-center text-gray-900 text-2xl font-medium leading-loose">
                      {product.name}
                    </h3>
                      <p className="w-full p-2 text-center text-gray-600 text-base font-normal leading-relaxed">
                        {product.description}
                      </p>

                      <button 
                      onClick={() => router.push(`./products/${product.id}`)}
                      className="w-full py-2 border mt-4 tracking-wide font-semibold text-gray-600 border-gray-400 bg-gray-50 hover:tracking-widest hover:scale-[1.1] hover:text-gray-500 hover:bg-white hover:shadow-md transition-all duration-400">
                        Learn more
                      </button>
                  </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            ref={(node) => setNextEl(node)}
            className="bg-white border-2 text-white px-2 py-2 rounded-r"
          >
            <svg
              className="h-6 w-6 text-gray-900"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSoldSection;
