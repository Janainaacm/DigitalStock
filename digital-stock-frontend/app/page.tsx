"use client";
import Image from "next/image";
import CustomButton from "./globalComponents/ui-elements/CustomButton";
import { useEffect } from "react";
import { useAuthState } from "./store/AuthState";
import React from "react";
import Slideshow from "./components/heroSection/SlideShow";

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

      {/* ===== Carousel Section ===== */}
      <Slideshow />

      <main className="flex flex-col items-center px-4 justify-evenly md:flex-row md:justify-center md:h-5/6 ">
        <section className=" md:max-w-md lg:max-w-lg">
          <h1 className="flex flex-col items-center md:items-start text-[max(4vw,32px)] font-extrabold tracking-wide font-mono leading-snug ">
            Welcome to
            <span className="text-transparent bg-gradient-to-r from-limedSpruce-500 via-bismark-600 to-jetStream-400 bg-clip-text">
              DigitalStock
            </span>
          </h1>
          <p className="max-w-sm my-8 tracking-tight text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            sit illum quisquam. Quia nostrum neque quod praesentium numquam
            magnam rem aliquid laboriosam vero libero? Quo commodi debitis quia?
            Hic, eius.
          </p>
          <section className="flex gap-8 my-8 justify-evenly md:justify-start ">
            <CustomButton href={"/products"} text={"products"} />
            <CustomButton href={"/admin/adminDashboard"} text={"admin"} />
            <CustomButton href={"/auth/register"} text={"Register user"} />
          </section>
        </section>

        <div className="p-4 md:max-w-xl ">
          <Image
            src={"/images/electronic-device-collection.jpg"}
            alt={"Electronic Device Image"}
            width={700}
            height={500}
            className=""
          />
        </div>
      </main>
    </>
  );
}
