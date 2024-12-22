import { useAdminState } from "@/app/store/AdminState";
import { useAppState } from "@/app/store/BackendAPIState";
import LoadingIcon from "@/public/icons/LoadingIcon";
import SuccessIcon from "@/public/icons/SuccessIcon";
import UploadIcon from "@/public/icons/UploadIcon";
import { useEffect, useState } from "react";

interface Props {
  setCategory: (name: string) => void;
  setCreateNewCategory: () => void;
  error: string[];
  success: boolean; 
}

const CreateNewCategory = ({ error, setCategory, setCreateNewCategory, success }: Props) => {
  const { addNewCategory } = useAdminState();
  const { categories } = useAppState();
  const [input, setInput] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [submited, setSubmited] = useState(false);
  const [created, setCreated] = useState(false);

  const createCategory = async () => {
    await addNewCategory(input);
    setChosenCategory(input);
    setCategory(input);
    setSubmited(true);
  };

  useEffect(() => {
    const isInCategoryList = categories.some(
      (category) => category.name === input
    );

    if (isInCategoryList) {
      setCreated(true);
      setCategory(chosenCategory);
    } else {
      setCreated(false);
    }
  }, [categories]);

  const renderSymbol = () => {
    if (!submited) {
      return <UploadIcon />;
    } else if (!created) {
      return <LoadingIcon />;
    } else if (created) {
      return <SuccessIcon />;
    }
  };

  useEffect(() => {
    if (success) {
      setInput("");
      setChosenCategory("");
      setSubmited(false);
      setCreated(false);
    }
  }, [success]);


  const isError = error.includes("category");


  return (
    <div>
      <div className="flex my-3 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setCreated(false);
          setSubmited(false);
        }}
        className={`px-2 w-full border rounded-md mr-4 py-1 italic ${
          isError ? "border-red-500 placeholder-red-500" : "border-gray-300"
        }`}
        placeholder={chosenCategory || "Enter category..."}
      />
        <button
          onClick={createCategory}
          className={`px-3 py-1.5 flex items-center rounded-lg bg-blue-400 text-white ${
            !created && submited ? "bg-gray-600" : ""
          } ${created ? "bg-green-600" : ""}`}
        >
          {renderSymbol()}
        </button>
      </div>
      <div className="flex align-center justify-between">
      <button
        onClick={setCreateNewCategory}
        className="text-blue-500 hover:text-blue-600 transition-all duration-400 font-semibold"
      >
        Select from existing
      </button>
      {isError && <p className="text-red-500 text-sm mt-1">Category is required.</p>}
      </div>
      
    </div>
  );
};

export default CreateNewCategory;
