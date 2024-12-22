"use client";
import { useEffect, useState } from "react";
import CategoryDropdown from "./functions/CategoryDropdown";
import CreateNewCategory from "./functions/CreateNewCategory";
import RenderImage from "./functions/RenderImage";
import { useAdminState } from "@/app/store/AdminState";
import { ProductInterface } from "@/app/utils/Types";

type Props = {
  onProducts: () => void;
};

const AddProductPage = ({onProducts}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [colorName, setColorName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [category, setCategory] = useState("");
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const { addNewProduct } = useAdminState();
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    console.log(category);
  }, [category]);

  const renderCategory = () => {
    if (createNewCategory) {
      return (
        <CreateNewCategory
          error={error}
          setCategory={setCategory}
          setCreateNewCategory={() => setCreateNewCategory(false)}
          success={success}
        />
      );
    } else {
      return (
        <CategoryDropdown 
          error={error}
          chosenCategory={category}
          setCategory={setCategory}
          setCreateNewCategory={() => setCreateNewCategory(true)}
        />
      );
    }
  };

  const validateFields = () => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push("name");
    }
    if (!description.trim()) {
      newErrors.push("description");
    }
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.push("price");
    }
    if (!category.trim()) {
      newErrors.push("category");
    }
    if (!colorName.trim()) {
      newErrors.push("colorName");
    }
    if (!imageUrl.trim()) {
      newErrors.push("imageUrl");
    }
    if (!stock || isNaN(parseInt(stock, 10)) || parseInt(stock, 10) < 0) {
      newErrors.push("stock");
    }

    setError(newErrors);

    if (newErrors.length > 0) {
      return false;
    }

    return true;
  };

  const handleAddNewProduct = async () => {
    if (!validateFields()) {
      return;
    }
  
    const newProduct: ProductInterface = {
      id: 0,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryName: category.trim(),
      colorName: colorName.trim(),
      imageUrl: imageUrl.trim(),
      stock: parseInt(stock, 10),
      sales: 0
    };
  
    try {
      await addNewProduct(newProduct);
      setSuccess(true); 
      resetFields(); 
  
      
      setTimeout(() => {
        setSuccess(false);
        onProducts();
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  const SuccessPopup = () => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <svg
          className="h-12 w-12 text-green-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-lg font-semibold text-gray-700">Product added successfully!</p>
      </div>
    </div>
  );

  const resetFields = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setColorName("");
    setPrice("");
    setStock("");
    setCategory("");
    setError([]);
  };
  

  return (
    <>
    {success && <SuccessPopup />}

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
          <button
            onClick={handleAddNewProduct}
            className="text-white font-semibold flex rounded-2xl items-center text-md px-8 py-2 bg-blue-400 hover:scale-[1.05] hover:bg-blue-500 hover:shadow-lg transition-all duration-300"
          >
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
            <div className="border-2 border-gray-200  rounded-lg bg-gray-100 shadow-lg">
              <div className="pt-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">
                  Product name
                </h3>
                <input
                  type="text"
                  className={`w-1/2 rounded-lg border px-2 italic mt-2 py-1.5 ${
                    error.includes("name")
                      ? "border-red-500 placeholder-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("name") ? "Name is required" : "Name..."
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="py-4 pb-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Description</h3>
                <textarea
                  className={`w-full pb-52 rounded-lg border px-2 italic mt-2 py-1.5 ${
                    error.includes("description")
                      ? "border-red-500 placeholder-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("description")
                      ? "Description is required"
                      : "Description..."
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="border-2 border-gray-200 flex py-1 mt-4 rounded-lg bg-gray-100 shadow-lg">
              <div className="py-4 pb-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Price</h3>
                <input
                  type="number"
                  className={`w-full rounded-lg border px-2 italic mt-2 py-1.5 ${
                    error.includes("price")
                      ? "border-red-500 placeholder-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("price") ? "Price is required" : "Price..."
                  }
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setPrice("");
                    } else {
                      setPrice(value);
                    }
                  }}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="py-4 pb-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Color name</h3>
                <input
                  type="text"
                  className={`w-full rounded-lg border px-2 italic mt-2 py-1.5 ${
                    error.includes("colorName")
                      ? "border-red-500 placeholder-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("colorName")
                      ? "Color name is required"
                      : "Color name..."
                  }
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                />
              </div>
              <div className="py-4 pb-4 px-6">
                <h3 className="text-xl font-bold text-gray-700">Stock</h3>
                <input
                  type="number"
                  className={`w-full rounded-lg border px-2 italic mt-2 py-1.5 ${
                    error.includes("stock")
                      ? "border-red-500 placeholder-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("stock") ? "Stock is required" : "Stock..."
                  }
                  value={stock}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setStock("");
                    } else {
                      setStock(value);
                    }
                  }}
                  step="1"
                  min="0"
                />
              </div>
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
              <RenderImage error={error} setChosenImageUrl={setImageUrl} success={success}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
