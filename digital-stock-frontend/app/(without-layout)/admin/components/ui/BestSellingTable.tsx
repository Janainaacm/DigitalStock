import { useAppState } from "@/app/store/BackendAPIState";
import { ProductInterface } from "@/app/utils/Types";
import { useEffect, useState } from "react";


const BestSellingTable = () => {
  const { productList, fetchAllProducts } = useAppState()
  const [bestSelling, setBestSelling] = useState<ProductInterface[]>([])

  useEffect(() => {
    if (productList.length == 0) {
      fetchAllProducts();
    }
  }, [productList])

  useEffect(() => {
    if (bestSelling.length == 0) {
      const topTen = [...productList]
        .sort((a, b) => (b.sales * b.price) - (a.sales * a.price))
        .slice(0, 10);

      setBestSelling(topTen);
    }
  }, [productList]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="py-6 px-4 md:px-6 xl:px-7">
        <h4 className="text-xl font-semibold text-black">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 sm:grid-cols-8 md:px-6 2xl:px-7 text-gray-500">
        <div className="col-span-3 flex items-center">
          <p className="font-md">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
      </div>

      {bestSelling.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4 px-4 sm:grid-cols-8 md:px-6 2xl:px-7"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12 w-15 rounded-md">
                <img className="object-cover h-12 w-15" src={product.imageUrl} alt="Product" />
              </div>
              <p className="text-sm text-gray-500">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-gray-500">
              {product.categoryName}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-gray-500">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="col-span-1 flex items-center ml-4">
            <p className="text-sm text-center text-gray-500">{product.sales}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${(product.sales * product.price).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSellingTable;
