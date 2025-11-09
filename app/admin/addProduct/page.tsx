"use client";

import React, { useState } from "react";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    author: "goutam",
    authorImg: "/goutam.png",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", data.image);
    formData.append("authorImg", data.authorImg);

    const response = await axios.post("/api/blog", formData);

    if (response.data.success) {
      toast.success(response.data.message || "Blog added successfully!");
      setImage(null)
      setData({
        title: "",
        description: "",
        category: "",
        image: "",
        author: "goutam",
        authorImg: "/goutam.png",
      })
    } else {
      toast.error("Something went wrong!");
    }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to upload blog.");
    // }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:pl-16"
      >
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="thumbnail preview"
          />
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Write content here"
          rows={6}
          required
        />

        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          required
        >
          <option value="">Select category</option>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        <br />
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white"
        >
          ADD
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default page;
// 2:58:47