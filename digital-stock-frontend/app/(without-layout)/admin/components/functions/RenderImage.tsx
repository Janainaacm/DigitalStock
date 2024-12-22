import ErrorIcon from "@/public/icons/ErrorIcon";
import LoadingIcon from "@/public/icons/LoadingIcon";
import SuccessIcon from "@/public/icons/SuccessIcon";
import UploadIcon from "@/public/icons/UploadIcon";
import Image from "next/image";

import { useEffect, useState } from "react";

interface Props {
  setChosenImageUrl: (url: string) => void;
  error: string[];
  success: boolean; 
  url?: string;
}

const RenderImage = ({ error, setChosenImageUrl, success, url }: Props) => {
  const [shownImageUrl, setShownImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageCompiled, setImageCompiled] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState("");

  useEffect(() => {
    if (url) {
      setImageUrl(url.trim())
      handleUpload(url.trim())
    }
  }, [url])

  const handleImageLoad = () => {
    setLoadingImage(false);
    setImageCompiled(true);
  };

  const handleImageError = () => {
    setLoadingImage(false);
    setImageCompiled(false);
    setErrorIcon(true);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      setChosenImageUrl(url)
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setImageErrorMsg(err.message);
        setErrorIcon(true);
      }
      return false;
    }
  };

  const handleUpload = (inputUrl?: string) => {
    setUploadClicked(true);
    setLoadingImage(true);
    const urlToValidate = inputUrl || imageUrl.trim(); 
    if (isValidUrl(urlToValidate)) {
      setShownImageUrl(urlToValidate);
      setChosenImageUrl(urlToValidate);
    } else {
      setImageCompiled(false);
    }
  };
  

  const renderSymbol = () => {
    if (loadingImage && !errorIcon) {
      return <LoadingIcon />;
    }
    if (errorIcon) {
      return <ErrorIcon />;
    }
    if (imageCompiled) {
      return <SuccessIcon />;
    }
    return <UploadIcon />;
  };

  useEffect(() => {
    if (success) {
      setImageUrl("");
      setShownImageUrl("");
      setImageCompiled(false);
      setLoadingImage(false);
      setUploadClicked(false);
      setErrorIcon(false);
      setImageErrorMsg("");
    }
  }, [success]);


  const isError = error.includes("category");


  return (
    <div className="px-6 py-3">
      <div className={`border w-full aspect-square bg-white rounded-lg relative ${isError ? "border-red-500" : ""}`}>
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
          setErrorIcon(false);
          setImageErrorMsg("");
          setShownImageUrl("");
        }}
        placeholder={isError ? "Image URL is required" : "Image URL"}
        className={`px-3 py-1.5 rounded-lg border tracking-wider flex-1 ${
          isError ? "border-red-500 placeholder-red-500" : "border-gray-200 placeholder-gray-400"
        }`}
      />
        <button
          onClick={() => handleUpload()}
          className={`px-3 py-2 rounded-lg text-white
    ${loadingImage && !errorIcon ? "bg-gray-600" : ""}
    ${errorIcon ? "bg-red-600" : ""}
    ${imageCompiled ? "bg-green-600" : ""}
    ${!uploadClicked && !loadingImage && !imageCompiled ? "bg-blue-400" : ""}`}
        >
          {renderSymbol()}
        </button>
      </div>
      <div className="h-3">
        <p className="text-red-500 text-xs text-center">{imageErrorMsg}</p>
      </div>
    </div>
  );
};

export default RenderImage;
