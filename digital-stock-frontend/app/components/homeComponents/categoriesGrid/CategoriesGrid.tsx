"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter } from "next/navigation";

const CategoriesGridSection = () => {
  const router = useRouter();
  const { fetchProductsByCategory } = useAppState();

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category);
    router.push("/products");
  };
  
  return (
    <div>
      <div className="pb-6 pt-3 -mt-16 shadow-inner border-t border-gray-200">
          <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-loose pb-2.5">
            Shop by category
          </h2>
          <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">
            Discover your new favorites
          </p>
        </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="gallery">
          <div className="flex flex-col mb-10">
            <div className="grid grid-rows-5 mx-12 grid-flow-col gap-8 mb-10 h-[800px]">
              <div className="relative row-span-5 col-span-3 group">
                <img
                  src="/images/watchWinter.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Watches")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50  text-white text-lg font-semibold rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartwatches
                </button>
              </div>

              <div className="relative row-span-3 col-span-4 group">
                <img
                  src="/images/Phone-waterfall.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Smartphones")}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Smartphones
                </button>
              </div>

              <div className="relative row-span-2 col-span-4 group">
                <img
                  src="/images/Headphones.jpg"
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-3xl group-hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <button
                  onClick={() => searchByCategory("Earphones")}
                  className="absolute inset-0 bg-gray-900 bg-opacity-50  flex items-center justify-center text-white text-lg font-semibold rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  Shop Headphones
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
