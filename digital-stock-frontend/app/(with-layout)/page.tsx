"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useAuthState } from "../store/AuthState";
import React from "react";
import Slideshow from "../components/homeComponents/heroSection/SlideShow";
import BestSoldSection from "../components/homeComponents/bestSoldSection/BestSoldSection";
import ShopBanner from "../components/homeComponents/shopBanner/ShopBanner";
import CategoriesGridSection from "../components/homeComponents/categoriesGrid/CategoriesGrid";
import OurShop from "../components/homeComponents/ourShop/OurShopComponent";

export default function Home() {
  const { initializeState } = useAuthState();
  const { user } = useAuthState();

  useEffect(() => {
    if (!user) {
      initializeState();
    }
  });

  return (
    <>
      <Slideshow />

      <section>
        <CategoriesGridSection/>
        <BestSoldSection/>
        <OurShop/>
      </section>

      <main className="flex flex-col items-center px-4 justify-evenly md:flex-row md:justify-center md:h-5/6">
        
      </main>
    </>
  );
}
