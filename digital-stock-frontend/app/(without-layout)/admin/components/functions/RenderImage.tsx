import ErrorIcon from "@/public/icons/ErrorIcon";
import LoadingIcon from "@/public/icons/LoadingIcon";
import SuccessIcon from "@/public/icons/SuccessIcon";
import UploadIcon from "@/public/icons/UploadIcon";
import Image from "next/image";

import { useEffect, useState, useRef } from "react";

interface Props {
  setBase64Image: (base64String: string) => void;
  error: string[];
  success: boolean; 
  existingBase64Image?: string;
}

const RenderImage = ({ error, setBase64Image, success, existingBase64Image }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageCompiled, setImageCompiled] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingBase64Image) {
      setImagePreview(existingBase64Image);
      setImageCompiled(true);
    }
  }, [existingBase64Image]);

  const handleImageLoad = () => {
    setLoadingImage(false);
    setImageCompiled(true);
  };

  const handleImageError = () => {
    setLoadingImage(false);
    setImageCompiled(false);
    setErrorIcon(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageErrorMsg("Please select an image file");
      setErrorIcon(true);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageErrorMsg("Image size should be less than 5MB");
      setErrorIcon(true);
      return;
    }

    setLoadingImage(true);
    setErrorIcon(false);
    setImageErrorMsg("");
    
    // Create a preview URL for the UI
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // The base64 string format should be: "data:[mime-type];base64,[base64-data]"
        const base64String = event.target.result as string;
        setBase64Image(base64String);
        setLoadingImage(false);
        setImageCompiled(true);
      }
    };
    reader.onerror = () => {
      setErrorIcon(true);
      setImageErrorMsg("Failed to read file");
      setLoadingImage(false);
    };
    reader.readAsDataURL(file); // This creates a data URL that includes the MIME type
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
      setImagePreview(null);
      setImageCompiled(false);
      setLoadingImage(false);
      setErrorIcon(false);
      setImageErrorMsg("");
    }
  }, [success, setBase64Image]);

  const isError = error.includes("image");

  return (
    <div className="px-6 py-3">
      <div className={`border w-full aspect-square bg-white rounded-lg relative ${isError ? "border-red-500" : ""}`}>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt={"Product image"}
            className="p-5"
            fill
            style={{ objectFit: "cover" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        {!imagePreview && (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image selected
          </div>
        )}
      </div>
      
      <div className="py-3 w-full flex items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <button
          onClick={handleUploadClick}
          className={`px-4 py-2 rounded-lg text-white w-full flex items-center justify-center
            ${loadingImage && !errorIcon ? "bg-gray-600" : ""}
            ${errorIcon ? "bg-red-600" : ""}
            ${imageCompiled ? "bg-green-600" : ""}
            ${!loadingImage && !errorIcon && !imageCompiled ? "bg-blue-400" : ""}`}
        >
          <span className="mr-2">{renderSymbol()}</span>
          {imageCompiled ? "Change Image" : "Upload Image"}
        </button>
      </div>
      
      <div className="h-3">
        <p className="text-red-500 text-xs text-center">{imageErrorMsg}</p>
        {isError && !imageErrorMsg && (
          <p className="text-red-500 text-xs text-center">Image is required</p>
        )}
      </div>
    </div>
  );
};

export default RenderImage;