import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useAppState } from "@/app/store/BackendAPIState";
import DeleteCategoryButton from "./DeleteCategoryButton";

const ManageCategories = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((prev) => !prev);
  const { categories, fetchAllCategories, productList } = useAppState();

  useEffect(() => {
    if (categories.length == 0) {
        fetchAllCategories()
    }
  }, [categories])

  const numberInCategories = (categoryName: string) => {
    const amount = productList.filter((product) => product.categoryName === categoryName)

    return amount.length
  }


  return (
    <>
      <button onClick={toggleModal} className="text-sm border px-8 py-2 border-gray-400 hover:border-gray-600 hover:tracking-wider hover:shadow-md transition-all duration-400">
        Manage categories
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={toggleModal} className="relative z-[999]">
          <div className="fixed inset-0 bg-black-300 bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 bg-white rounded-md">
                <div>
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 whitespace-nowrap">
                            <tr>
                                <th className="p-4 text-left pl-4 text-sm font-semibold text-black w-2/4">
                                    Category
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-black w-1/4">
                                    Products
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-black w-1/4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="border-b">
                                    <td className="pl-4 py-2 text-left text-sm w-2/4">{category.name}</td>
                                    <td className="text-center text-sm w-1/4">{numberInCategories(category.name)}</td>
                                    <td className="text-center text-sm w-1/4"><DeleteCategoryButton category={category}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ManageCategories;
