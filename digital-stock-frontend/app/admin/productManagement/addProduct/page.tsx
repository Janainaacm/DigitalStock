"use client";
import { useEffect, useState } from "react";
import CategoryDropdown from "./components/CategoryDropdown";
import CreateNewCategory from "./components/CreateNewCategory";
import RenderImage from "./components/RenderImage";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //const [colorName, setColorName] = useState("");
  //const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  //const [stock, setStock] = useState(0);
  const [createNewCategory, setCreateNewCategory] = useState(false);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const renderCategory = () => {
    if (createNewCategory) {
      return (
        <CreateNewCategory
          setCategory={setCategory}
          setCreateNewCategory={() => setCreateNewCategory(true)}
        />
      );
    } else {
      return (
        <CategoryDropdown
          chosenCategory={category}
          setCategory={setCategory}
          setCreateNewCategory={() => setCreateNewCategory(true)}
        />
      );
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl flex items-center text-gray-700">
            <svg
              className="h-7 w-7 mr-3 text-gray-700"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="3" y1="21" x2="21" y2="21" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
              <path d="M5 21v-10.15" /> <path d="M19 21v-10.15" />
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            </svg>
            Add new product
          </h1>
          <button className="text-white font-semibold flex rounded-2xl items-center text-md px-8 py-2 bg-blue-400 hover:scale-[1.05] hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
            <svg
              className="h-5 w-5 mr-4 text-white"
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
              <path d="M5 12l5 5l10 -10" />
            </svg>
            Add new product
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="mx-5 col-span-2">
            <div className="border-2 border-gray-200 h-[200px] rounded-lg bg-gray-100 shadow-lg">
              <div className="py-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Product name</h3>
                <input 
                type="text"
                className="w-1/2 rounded-lg border px-2 italic mt-2 py-1.5"
                placeholder="Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                 />
              </div>
              <div className="py-4 mb-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Description</h3>
                <input 
                type="text"
                className="w-1/2 rounded-lg border px-2 italic mt-2 py-1.5"
                placeholder="Name..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                 />
              </div>
            </div>

            <div className="border-2 border-gray-200 h-[200px] rounded-lg bg-gray-100 shadow-lg">
              <div>{/* Add name */}</div>
              <div>{/* Add description */}</div>
            </div>
          </div>

          <div className="">
            <div className="border-2 border-gray-200 mb-4 rounded-lg bg-gray-100 shadow-lg">
              <div className="py-4 px-6">
                <h3 className="text-lg font-bold">Category</h3>
                {renderCategory()}
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-lg bg-gray-100 shadow-lg h-auto">
              <RenderImage setChosenImageUrl={setImageUrl} />
              <p>{imageUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
