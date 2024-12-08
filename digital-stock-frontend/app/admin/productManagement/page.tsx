"use client";
import { useAppState } from "@/app/store/BackendAPIState";
import DeleteProductButton from "./components/DeleteProductButton";
 
const ProductManagementPage = () => {
  const { productList } = useAppState();

  const handleEdit = () => {}



   return (
    <div className="relative font-[sans-serif] h-screen">
      <h1 className="px-6 py-6 text-4xl font-extrabold text-gray-800">
        Products
      </h1>

      <p>filter?</p>

      <div className=" px-6 overflow-x-auto font-[sans-serif]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Product
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Price
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                In stock
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Sales
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Color
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {productList.map((product) => (
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
                  <button
                  onClick={handleEdit}>
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
                  <DeleteProductButton product={product}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:flex m-4">
          <p className="text-sm text-gray-500 flex-1">
            Showind 1 to 5 of 100 entries
          </p>
          <div className="flex items-center max-md:mt-4">
            <p className="text-sm text-gray-500">Display</p>

            <select className="text-sm text-gray-500 border border-gray-400 rounded h-8 px-1 mx-4 outline-none">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>

            <ul className="flex space-x-1 ml-4">
              <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-gray-500"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
              <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                1
              </li>
              <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-8 h-8 rounded">
                2
              </li>
              <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                3
              </li>
              <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                4
              </li>
              <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-gray-500 rotate-180"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductManagementPage;
