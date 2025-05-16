"use client";
import { useEffect } from "react";
import { useAuthState } from "../store/AuthState";
import React from "react";
import Slideshow from "../components/homeComponents/heroSection/SlideShow";
import BestSoldSection from "../components/homeComponents/bestSoldSection/BestSoldSection";
import CategoriesGridSection from "../components/homeComponents/categoriesGrid/CategoriesGrid";
import OurShop from "../components/homeComponents/ourShop/OurShopComponent";
import { useAppState } from "../store/BackendAPIState";

export default function Home() {
  const { initializeState, user } = useAuthState();
  const { setIsAuthOpen } = useAppState();

  useEffect(() => {
    if (!user) {
      initializeState();
    }
  });

  useEffect(() => {
    const shouldShowAuth = sessionStorage.getItem("showAuth");
    if (shouldShowAuth) {
      setIsAuthOpen(true);
      sessionStorage.removeItem("showAuth");
    }
  }, []);
  

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
