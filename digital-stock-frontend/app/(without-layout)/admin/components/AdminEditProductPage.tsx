'use client'

import { useAdminState } from "@/app/store/AdminState";
import { ProductInterface } from "@/app/utils/Types";
import { useState, useEffect } from "react";
import CategoryDropdown from "./functions/CategoryDropdown";
import CreateNewCategory from "./functions/CreateNewCategory";
import RenderImage from "./functions/RenderImage";
import LoadingPage from "@/app/components/loadingPage/LoadingPage";

type Props = {
  onProducts: () => void;
};

const EditProductPage = ({onProducts}: Props) => {
  const { productDetails, editProduct } = useAdminState()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const [colorName, setColorName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [category, setCategory] = useState("");
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    resetFields()
  }, [productDetails]);

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

    if (!base64Image && !productDetails?.image) {
      newErrors.push("image");
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

  const handleSaveChanges = async () => {
    if (!validateFields() || !productDetails) {
      return;
    }
  
    setIsSubmitting(true);
    
    const newProduct: ProductInterface = {
      id: 0,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryName: category.trim(),
      colorName: colorName.trim(),
      image: base64Image || productDetails.image,
      stock: parseInt(stock, 10),
      sales: 0
    };
  
    try {
      console.log("new product: ", newProduct);
      console.log("productDetails: ", productDetails);
      await editProduct(productDetails.id, newProduct);
      setSuccess(true); 
      resetFields(); 
  
      setTimeout(() => {
        setSuccess(false);
        onProducts();
      }, 3000);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFields = () => {
    if (productDetails) {
      setName(productDetails.name);
      setDescription(productDetails.description);
      setBase64Image(null);
      setColorName(productDetails.colorName);
      setPrice(productDetails.price.toString());
      setStock(productDetails.stock.toString());
      setCategory(productDetails.categoryName);
      setError([]);
    }
  };

  if (!productDetails) {
    return <LoadingPage />;
  }
  
  const SuccessPopup = () => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-30 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center transform transition-all animate-fade-in">
        <div className="bg-green-100 p-3 rounded-full mb-4">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xl font-medium text-gray-800">Changes saved successfully!</p>
      </div>
    </div>
  );

  return (
    <>
    {success && <SuccessPopup />}

      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto bg-zinc-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl flex items-center text-gray-800 font-bold">
            <svg
              className="h-6 w-6 md:h-7 md:w-7 mr-3 text-indigo-600"
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
              <line x1="3" y1="21" x2="21" y2="21" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
              <path d="M5 21v-10.15" /> <path d="M19 21v-10.15" />
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            </svg>
            Edit Product
          </h1>
          <button
            onClick={handleSaveChanges}
            disabled={isSubmitting}
            className={`w-full sm:w-auto text-white font-medium flex justify-center rounded-lg items-center text-md px-6 py-3 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5 mr-3 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2 text-white"
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
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Product Details
              </h3>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className={`w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    error.includes("name")
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("name") ? "Name is required" : "Enter product name..."
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.includes("name") && (
                  <p className="mt-1 text-sm text-red-600">Name is required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className={`w-full h-40 rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    error.includes("description")
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder={
                    error.includes("description")
                      ? "Description is required"
                      : "Enter product description..."
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {error.includes("description") && (
                  <p className="mt-1 text-sm text-red-600">Description is required</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Product Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className={`w-full rounded-lg border pl-7 pr-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        error.includes("price")
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder={
                        error.includes("price") ? "Required" : "0.00"
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
                  {error.includes("price") && (
                    <p className="mt-1 text-sm text-red-600">Valid price is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      error.includes("colorName")
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      error.includes("colorName")
                        ? "Color is required"
                        : "e.g. Navy Blue"
                    }
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                  />
                  {error.includes("colorName") && (
                    <p className="mt-1 text-sm text-red-600">Color name is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    className={`w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      error.includes("stock")
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      error.includes("stock") ? "Required" : "0"
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
                  {error.includes("stock") && (
                    <p className="mt-1 text-sm text-red-600">Valid stock is required</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Category
              </h3>
              {renderCategory()}
              {error.includes("category") && (
                <p className="mt-2 text-sm text-red-600">Category is required</p>
              )}
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Product Image
              </h3>
              <RenderImage 
                error={error} 
                setBase64Image={setBase64Image} 
                success={success} 
                existingBase64Image={productDetails.image} 
              />
              {error.includes("image") && (
                <p className="mt-2 text-sm text-red-600">Product image is required</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;