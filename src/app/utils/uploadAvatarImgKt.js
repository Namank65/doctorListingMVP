"use client";
import { MdFileUpload } from "react-icons/md";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef } from "react";
import { Context } from "./context";

const ImageUploader = () => {
  const { setImageKitUploadResponce } = Context();
  const fileInputRef = useRef(null);

  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imageKitAuth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        abortSignal: abortController.signal,
      });
      setImageKitUploadResponce(uploadResponse?.url);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="flex">
      <div className=" flex flex-col md:flex-row gap-5">
        <div className="flex border items-center rounded-sm hover:scale-90 ">
          <MdFileUpload className="text-2xl" />
          <input
            type="file"
            name="avatar"
            ref={fileInputRef}
            className="cursor-pointer"
          />
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="border p-2 rounded-sm text-white hover:bg-[#304a52] bg-[#106C89]"
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
