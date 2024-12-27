"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import { ProductInterface } from "@/app/utils/Types";
import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
};

type SelectedFilter =
  | "sold"
  | "price-lo-hi"
  | "price-hi-lo"
  | "name-az"
  | "name-za"
  | "stock"
  | "";

const FilterProductsDropdown = ({ onClose }: Props) => {
  const {
    fetchDisplayProducts,
    displayProducts,
    fetchAllCategories,
    categories,
    setFilteredProductList,
    productList,
  } = useAppState();

  const [tempFilteredProducts, setTempFilteredProducts] = useState<
    ProductInterface[]
  >([]);
  const [sortField, setSortField] = useState<keyof ProductInterface | "">("");
  const [selectedField, setSelectedField] = useState<SelectedFilter>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [categoriesInFilter, setCategoriesInFilter] = useState<string[]>([]);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);
  const [filterByStock, setFilterByStock] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const availableColors = Array.from(
    new Set(productList.map((product) => product.colorName))
  );

  useEffect(() => {
    if (displayProducts.length == 0) {
      fetchDisplayProducts();
    }

    if (categories.length == 0) {
      fetchAllCategories();
    }
  }, [fetchDisplayProducts, displayProducts, fetchAllCategories, categories]);

  useEffect(() => {
    let filteredProducts = [...productList];

    if (categoriesInFilter.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoriesInFilter.includes(product.categoryName)
      );
    }

    if (filterByStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stock > 0
      );
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedColors.includes(product.colorName)
      );
    }

    if (sortField) {
      filteredProducts.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (
          sortField === "price" ||
          sortField === "sales" ||
          sortField === "stock"
        ) {
          const numA = typeof valA === "number" ? valA : 0;
          const numB = typeof valB === "number" ? valB : 0;

          return sortOrder === "asc" ? numA - numB : numB - numA;
        } else if (sortField === "name") {
          if (typeof valA === "string" && typeof valB === "string") {
            return sortOrder === "asc"
              ? valA.localeCompare(valB)
              : valB.localeCompare(valA);
          }
        }

        return 0;
      });
    }

    setTempFilteredProducts(filteredProducts);
  }, [
    productList,
    categoriesInFilter,
    sortField,
    sortOrder,
    filterByStock,
    selectedColors,
  ]);

  const filterByCategory = (categoryName: string) => {
    const updatedCategories = categoriesInFilter.includes(categoryName)
      ? categoriesInFilter.filter((name) => name !== categoryName)
      : [...categoriesInFilter, categoryName];

    setCategoriesInFilter(updatedCategories);

    const filteredProducts =
      updatedCategories.length === 0
        ? productList
        : productList.filter((product) =>
            updatedCategories.includes(product.categoryName)
          );

    setFilteredProductList(filteredProducts);
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const resetFilter = () => {
    setCategoriesInFilter([]);
    setSortField("");
    setSortOrder("asc");
    setFilterByStock(false);
    setSelectedColors([]);
    setTempFilteredProducts(productList);
    onClose()
  };

  const applyGlobalFilter = () => {
    setFilteredProductList(tempFilteredProducts);
    fetchDisplayProducts();
    onClose();
  };

  const setSorting = (field: keyof ProductInterface, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="w-[300px] max-w-xl bg-white shadow-lg relative ml-auto h-screen">
      <div className="overflow-auto p-6 h-full">
        <div className="flex items-center border-b pt-6 pb-4 text-gray-800">
          <h3 className="text-2xl font-bold flex-1">Filter</h3>
          <button onClick={onClose}>
            <svg
              className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
        </div>

        <div className="relative h-full">
          <div className="h-auto py-6 overflow-scroll no-scrollbar">
            <div className="space-y-4">
              <ol className="flex flex-col justify-between">
                <li className="group relative w-full text-xl border-b py-4">
                  <button
                    onClick={() => setCategoryDropdown(!categoryDropdown)}
                    className="group-hover:text-blue-400 group-hover:fill-blue-400 text-gray-600 block"
                  >
                    Category
                    <svg
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </button>

                  <ul
                    className={`top-5 left-0 z-50 block bg-white overflow-hidden min-w-[250px] max-h-0 transition-all duration-500 ${
                      categoryDropdown ? "py-3 max-h-[700px]" : ""
                    }`}
                  >
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className={`border-b py-2 ${
                          categoriesInFilter.includes(category.name)
                            ? "bg-white text-blue-400"
                            : "bg-gray-50 text-gray-600 shadow-inner"
                        }`}
                      >
                        <button
                          onClick={() => filterByCategory(category.name)}
                          className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                        >
                          <h5>{category.name}</h5>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="group relative w-full text-xl border-b py-4 my-3">
                  <button
                    onClick={() => setSortDropdown(!sortDropdown)}
                    className="group-hover:text-blue-400 group-hover:fill-blue-400 text-gray-600 block"
                  >
                    Sort by
                    <svg
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`top-5 left-0 z-50 block bg-white overflow-hidden min-w-[250px] max-h-0 transition-all duration-500 ${
                      sortDropdown ? "py-3 max-h-[700px]" : ""
                    }`}
                  >
                    <li
                      className={`border-b py-2 ${
                        selectedField == "price-lo-hi"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSorting("price", "asc");
                          setSelectedField("price-lo-hi");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        Price $-$$$
                      </button>
                    </li>
                    <li
                      className={`border-b py-2 ${
                        selectedField == "price-hi-lo"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSorting("price", "desc");
                          setSelectedField("price-hi-lo");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        Price $$$-$
                      </button>
                    </li>
                    <li
                      className={`border-b py-2 ${
                        selectedField == "name-az"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSorting("name", "asc");
                          setSelectedField("name-az");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        Name A-Z
                      </button>
                    </li>
                    <li
                      className={`border-b py-2 ${
                        selectedField == "name-az"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSorting("name", "desc");
                          setSelectedField("name-za");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        Name Z-A
                      </button>
                    </li>
                    <li
                      className={`border-b py-2 ${
                        selectedField == "name-za"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSorting("sales", "desc");
                          setSelectedField("sold");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        Best sold
                      </button>
                    </li>
                    <li
                      className={`border-b py-2 ${
                        selectedField == "stock"
                          ? "bg-white text-blue-400"
                          : "bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setFilterByStock(!filterByStock);
                          setSelectedField("stock");
                        }}
                        className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                      >
                        In Stock
                      </button>
                    </li>
                  </ul>
                </li>

                <li className="group relative w-full text-xl border-b py-4 ">
                  <button
                    onClick={() => setColorDropdown(!colorDropdown)}
                    className="group-hover:text-blue-400 group-hover:fill-blue-400 text-gray-600 block"
                  >
                    Color
                    <svg
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`top-5 left-0 z-50 block bg-white overflow-scroll min-w-[250px] max-h-0 transition-all duration-500 ${
                      colorDropdown ? "py-3 max-h-[500px]" : ""
                    }`}
                  >
                    {availableColors.map((color) => (
                      <li
                        key={color}
                        className={`border-b py-2 ${
                          selectedColors.includes(color)
                            ? "bg-white text-blue-400"
                            : "bg-gray-50 text-gray-600 shadow-inner"
                        }`}
                      >
                        <button
                          className="text-sm w-full h-full text-left font-semibold tracking-wide ml-2"
                          onClick={() => toggleColorFilter(color)}
                        >
                          {color}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div className="w-full absolute bottom-16">
            <button
              onClick={applyGlobalFilter}
              className="mt-3 text-sm font-semibold px-6 py-2 w-full bg-blue-400 hover:bg-blue-500 transition-all duration-300 text-white rounded-md tracking-wide"
            >
              Apply
            </button>
            <button
              className="mt-3 text-sm font-semibold px-6 py-2 w-full bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-white rounded-md tracking-wide"
              onClick={resetFilter}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProductsDropdown;
