"use client";
import { useAppState } from "@/app/store/BackendAPIState";
import DeleteProductButton from "./components/DeleteProductButton";
import { useState, useEffect } from "react";
import { ProductInterface } from "@/app/utils/Types";

type Props = {
  onAddProduct: () => void;
  onEditProduct: () => void;
};

const ProductManagementPage = ({onAddProduct, onEditProduct}: Props) => {
  const { productList, fetchAllProducts } = useAppState();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [sortedList, setSortedList] = useState<ProductInterface[]>([]);
  const [sortField, setSortField] = useState<keyof ProductInterface | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    let sorted = [...productList];

    if (sortField) {
      sorted.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === "string" && typeof valB === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
        return 0;
      });
    }

    setSortedList(sorted);
  }, [productList, sortField, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts: ProductInterface[] = sortedList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handleSort = (field: keyof ProductInterface) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div className="relative font-[sans-serif] h-screen">
      <h1 className="px-6 py-6 text-4xl font-extrabold text-gray-800">
        Products
      </h1>

      <div className=" px-6 overflow-x-auto font-[sans-serif]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="p-4 text-left text-sm font-semibold text-black cursor-pointer hover:text-blue-500"
              >
                Product
              </th>
              <th
                onClick={() => handleSort("price")}
                className="p-4 text-left text-sm font-semibold text-black cursor-pointer hover:text-blue-500"
              >
                Price
              </th>
              <th
                onClick={() => handleSort("stock")}
                className="p-4 text-left text-sm font-semibold text-black cursor-pointer hover:text-blue-500"
              >
                In stock
              </th>
              <th
                onClick={() => handleSort("sales")}
                className="p-4 text-left text-sm font-semibold text-black cursor-pointer hover:text-blue-500"
              >
                Sales
              </th>
              <th
                onClick={() => handleSort("colorName")}
                className="p-4 text-left text-sm font-semibold text-black cursor-pointer hover:text-blue-500"
              >
                Color
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="p-4 text-sm">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src={product.imageUrl}
                      className="w-10 h-10 shrink-0 bg-gray-100"
                    />
                    <div className="mx-4">
                      <p className="text-sm text-black">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">${product.price}</td>
                <td className="p-4 text-sm">{product.stock}</td>
                <td className="p-4 text-sm">{product.sales}</td>
                <td className="p-4 text-sm">{product.colorName}</td>
                <td className="p-4 text-sm">
                  <button onClick={() => console.log("Edit product", product)}>
                    <svg
                      className="h-5 w-5 text-gray-900 mr-1.5 hover:text-green-600 hover:scale-[1.2] transition-all duration-200"
                      viewBox="0 0 24 24"
                      strokeWidth="1.4"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                  <DeleteProductButton product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      
        <div className="flex justify-between items-center my-4">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstProduct + 1} to{" "}
            {Math.min(indexOfLastProduct, productList.length)} of{" "}
            {productList.length} entries
          </p>
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
