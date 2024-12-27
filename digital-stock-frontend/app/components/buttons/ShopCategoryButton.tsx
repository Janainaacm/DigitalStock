import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter } from "next/navigation";

type Props = {
  value: string;
  category: string;
};

const ShopCategoryButton = ({ category, value }: Props) => {
  const { fetchProductsByCategory } = useAppState();
  const router = useRouter();


  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category, router)
  };

  return (
    <div className={`group transition-all flex justify-center relative`}>
      <button
      onClick={() => searchByCategory(category)}
        type="button"
        className={`inline-block no-underline text-gray-500 font-semibold p-2 duration-500 group-hover:tracking-widest group-hover:text-gray-600`}
      >
        {value}
      </button>
      <div className="border-b-2 border-transparent absolute bottom-1 w-2.5 duration-500 mx-2 group-hover:w-full group-hover:border-gray-600 group-hover:duration-500"></div>
    </div>
  );
};

export default ShopCategoryButton;
