"use client";

import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
  onClick={() => router.back()}
  className="relative group px-8 py-1 text-gray-700 font-medium text-sm uppercase tracking-wide focus:outline-none flex items-center"
>
  <svg
    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
    aria-hidden="true"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 5H1m0 0 4 4M1 5l4-4"
    />
  </svg>
  Go Back
  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-600 transition-all duration-500 group-hover:w-full group-hover:h-full"></div>
  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-600 transition-all duration-500 group-hover:w-full group-hover:h-full"></div>
  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-600 transition-all duration-500 group-hover:w-full group-hover:h-full"></div>
  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-600 transition-all duration-500 group-hover:w-full group-hover:h-full"></div>
</button>
  );
};

export default GoBackButton;
