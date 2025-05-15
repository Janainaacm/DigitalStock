"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter } from "next/navigation";

const CategoriesGridSection = () => {
  const router = useRouter();
  const { fetchProductsByCategory } = useAppState();

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category, router);
  };
  
  return (
    <div>
      {/* Title section with responsive text sizes */}
      <div className="pb-4 pt-3 md:pb-6 md:-mt-16 shadow-inner border-t border-gray-200">
        <h2 className="w-full text-center text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold font-manrope leading-tight md:leading-loose pb-1 md:pb-2.5">
          Shop by category
        </h2>
        <p className="w-full text-center text-gray-600 text-base md:text-lg font-normal leading-6 md:leading-8">
          Discover your new favorites
        </p>
      </div>
      
      {/* Main content section with responsive padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        <div className="gallery">
          <div className="flex flex-col mb-6 md:mb-10">
            {/* Mobile layout - stack items vertically */}
            <div className="block md:hidden space-y-4">
              {/* Watches - Mobile */}
              <div className="relative group h-64">
                <img
                  src="/images/watchWinter.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Watches")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartwatches
                </button>
              </div>
              
              {/* Smartphones - Mobile */}
              <div className="relative group h-64">
                <img
                  src="/images/Phone-waterfall.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Smartphones")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartphones
                </button>
              </div>
              
              {/* Earphones - Mobile */}
              <div className="relative group h-64">
                <img
                  src="/images/Earphones.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Earphones")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Earphones
                </button>
              </div>
            </div>
            
            {/* Desktop/Tablet layout - complex grid */}
            <div className="hidden md:grid grid-rows-5 mx-4 lg:mx-12 grid-flow-col gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10 h-[600px] lg:h-[800px]">
              <div className="relative row-span-5 col-span-3 group">
                <img
                  src="/images/watchWinter.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-2xl lg:rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Watches")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartwatches
                </button>
              </div>

              <div className="relative row-span-3 col-span-4 group">
                <img
                  src="/images/Phone-waterfall.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-2xl lg:rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Smartphones")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartphones
                </button>
              </div>

              <div className="relative row-span-2 col-span-4 group">
                <img
                  src="/images/Earphones.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-2xl lg:rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Earphones")}
                  className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Earphones
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesGridSection;