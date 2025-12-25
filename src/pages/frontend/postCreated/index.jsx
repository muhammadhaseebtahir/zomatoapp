import React, { useState } from "react";
import { Button, message } from "antd";
import { X } from "lucide-react";
import axios from "axios";
export default function PostCreated({onClose}) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
 
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setType(selectedFile.type.startsWith("video") ? "video" : "image");
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    // Validation
    if (!file) {
      return message.info("Please select your image or video.");
    }
    if (!caption.trim()) {
      return message.info("Please write the caption.");
    }

    // File size validation (optional)
    const maxSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSize) {
      return message.error("File size should be less than 100MB.");
    }

    // File type validation (optional)
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      return message.error("Only images and videos are allowed.");
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("postData", JSON.stringify({ description: caption }));
      formData.append("media", file);

      const res = await axios.post(
        "http://localhost:8000/add/food-reels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // Optional: Upload progress
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      message.success(res.data?.message || "Post created successfully.");
onClose();
      // Reset form
      setCaption("");
      setFile(null);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

     
        message.error(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      
    } finally {
      setIsLoading(false);
      setFile(null)
      setCaption("")
      setPreview(null)
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/40  flex items-center justify-center z-50  "
     
    >
      <div className="bg-slate-300 shadow-lg dark:bg-black border-gray-50 dark:border-gray-800  w-[90%] max-w-lg  ">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800    ">
          <p className="font-semibold text-gray-800 dark:text-white ">
            Create new post
          </p>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        {/* *****BODY******** */}
        <div className="p-4 flex flex-col gap-4 ">
          {!preview ? (
            <label className="border border-dashed border-gray-800 p-8 text-center cursor-pointer ">
              <p className="text-gray-400">Click to upload image or video</p>
              <input
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <>
              {type === "image" ? (
                <img src={preview} className="rounded-md w-full h-80" />
              ) : (
                <video
                  src={preview}
                  controls
                  className="rounded-md w-full h-80"
                />
              )}

              <textarea
                placeholder="Write a caption..."
                className="bg-transparent border border-gray-700 p-2 rounded-md text-sm outline-none"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={isLoading}
                className="w-full py-2 rounded-md"
              >
                Share
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
