"use client";
import { useEffect } from "react";
import { useAuthState } from "../store/AuthState";
import React from "react";
import Slideshow from "../components/homeComponents/heroSection/SlideShow";
import BestSoldSection from "../components/homeComponents/bestSoldSection/BestSoldSection";
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

    </>
  );
}
