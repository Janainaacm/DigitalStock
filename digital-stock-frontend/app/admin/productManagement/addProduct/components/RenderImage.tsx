import ErrorIcon from "@/public/icons/ErrorIcon";
import LoadingIcon from "@/public/icons/LoadingIcon";
import SuccessIcon from "@/public/icons/SuccessIcon";
import UploadIcon from "@/public/icons/UploadIcon";
import Image from "next/image";

import { useState } from "react";

interface Props {
    setChosenImageUrl: (url: string) => void;
}

const RenderImage = ({setChosenImageUrl}: Props) => {
    const [shownImageUrl, setShownImageUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageCompiled, setImageCompiled] = useState(false);
    const [uploadClicked, setUploadClicked] = useState(false);
    const [imageErrorMsg, setImageErrorMsg] = useState("");
  
    const handleImageLoad = () => {
      setLoadingImage(false);
      setImageCompiled(true);
    };
  
    const handleImageError = () => {
      setLoadingImage(false);
      setImageCompiled(false);
    };
  
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (err) {
        if (err instanceof Error) {
          setImageErrorMsg(err.message);
        }
        return false;
      }
    };
  
    const handleUpload = () => {
      setUploadClicked(true);
      setLoadingImage(true)
      if (isValidUrl(imageUrl.trim())) {
        setShownImageUrl(imageUrl.trim());
        setChosenImageUrl(imageUrl.trim())
      } else {
        setImageCompiled(false);
      }
    };
  
    const renderSymbol = () => {
      if (!uploadClicked) {
        return <UploadIcon />;
      } else if (loadingImage && !imageCompiled){
        return <LoadingIcon />
      } else if (!imageCompiled && !loadingImage) {
        return <ErrorIcon />;
      } else if (imageCompiled) {
        return <SuccessIcon />;
      }
    };

    return (
        <div className="px-6 py-3">
        <div className="border-2 w-full aspect-square bg-white rounded-lg relative">
          {shownImageUrl && (
            <Image
              src={shownImageUrl}
              alt={"Product image"}
              className="p-5"
              fill
              style={{ objectFit: "cover" }}
              onLoadingComplete={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
        <div className="py-3 w-full flex items-center space-x-3">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setUploadClicked(false);
              setImageCompiled(false);
              setLoadingImage(false);
              setImageErrorMsg("");
            }}
            placeholder="Image url"
            className="px-3 py-1.5 rounded-lg border-2 border-gray-200 placeholder-gray-400 tracking-wider flex-1"
          />
          <button
            onClick={handleUpload}
            className={`px-3 py-2 rounded-lg bg-blue-400 text-white ${
              !imageCompiled && uploadClicked ? "bg-red-600" : ""
            } ${uploadClicked && imageCompiled ? "bg-green-600" : ""} ${
                loadingImage ? "bg-gray-600" : ""
            }`}
          >
            {renderSymbol()}
          </button>
        </div>
        <div className="h-3">
          <p className="text-red-500 text-xs text-center">
            {imageErrorMsg}
          </p>
        </div>
      </div>
    );
}

export default RenderImage;