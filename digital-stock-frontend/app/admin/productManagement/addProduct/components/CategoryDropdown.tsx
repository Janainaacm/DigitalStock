import { useAppState } from "@/app/store/BackendAPIState";
import { CategoryInterface } from "@/app/utils/Types";
import SuccessIcon from "@/public/icons/SuccessIcon";
import { DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";

interface Props {
  chosenCategory: string;
  setCategory: (name: string) => void;
  setCreateNewCategory: () => void;
}

const CategoryDropdown = ({ chosenCategory, setCategory, setCreateNewCategory }: Props) => {
  const { categories, fetchAllCategories } = useAppState();
  const [extended, setExtended] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryInterface[]>([]);
  const [title, setTitle] = useState("");

  const toggleExtend = () => setExtended((prev) => !prev);

  useEffect(() => {
    if (categories.length === 0) {
      fetchAllCategories();
    }
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (chosenCategory === "") {
        setTitle("Categories")
    } else {
        setTitle(chosenCategory)
    }
    
    
  }, [chosenCategory]);

  const handleChooseCategory = (name: string) => {
    setCategory(name);
    console.log("inside hello")
    console.log(chosenCategory)
    toggleExtend()
  };

  return (
    <div className="">
      <div className="relative rounded-lg font-[sans-serif] w-full">
        <button
          onClick={toggleExtend}
          type="button"
          id="dropdownToggle"
          className="pr-2 flex items-center ml-0 pt-2.5 text-[#333] text-md tracking-wider border-b border-gray-400 outline-none"
        >
          <span className=" px-2">{title}</span>
          {chosenCategory ? <SuccessIcon/> : null}
          <svg
            className="h-5 w-5 text-gray-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="w-full">
          <ul
            className={`absolute z-50 block bg-white overflow-scroll max-h-0 transition-all duration-500
       ${
         extended ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)] pt-3" : ""
       } `}
          >
            {categoryList.map((category) => (
              <li key={category.id} className="group border-b hover:bg-gray-50 py-4">
                <button 
                onClick={() => handleChooseCategory(category.name)}
                className={`group-hover:text-[#007bff] px-4 block text-md cursor-pointer ${
                    category.name === chosenCategory ? "text-blue-600 text-semibold" : "text-gray-600"
                }`}>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button 
        onClick={setCreateNewCategory}
        className="text-white bg-blue-400 px-4 mt-3 rounded-xl hover:bg-blue-600 transition-all duration-400 font-semibold">Or create new category</button>
      </div>
    </div>
  );
};
export default CategoryDropdown;
