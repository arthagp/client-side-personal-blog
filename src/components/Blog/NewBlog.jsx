"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllTags, createNewBlog } from "@/app/api/fetch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTitleTooLong, setIsTitleTooLong] = useState(false);
  const router = useRouter();

  const handleChangeDesc = (html) => {
    setDescription(html);
  };

  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;

    if (newTitle.length === 250) {
      setIsTitleTooLong(true);
    } else {
      setIsTitleTooLong(false);
      setTitle(newTitle);
    }
  };


  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const fetchTags = async () => {
    try {
      const response = await getAllTags();
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const selectedTagIds = selectedTags.map((tag) => tag.value); // mendapatkan id dari multi option

  const handleCreateBlog = async () => {
    try {
      const response = await createNewBlog({
        title,
        description,
        tagsId: selectedTagIds,
      });
      if (response) {
        toast.success("create blog success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/dashboard");
        setTitle("");
        setDescription("");
        setTags([]);
      } else {
        toast.error("Check Your Input", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-4 bg-gray-100 rounded border mt-10">
      <h2 className="text-2xl font-semibold mb-4">New Blog</h2>
      <div className="bg-white p-4 rounded border">
        <label htmlFor="title" className="block font-medium mb-2">
          Title :
        </label>
        <input
          type="text"
          id="title"
          className={`w-full p-2 border rounded ${
            isTitleTooLong ? "border-red-500" : null
          }`}
          maxLength="250"
          onChange={handleChangeTitle}
          value={title}
        />
        {isTitleTooLong && (
          <p className="text-red-500 mb-2">Title cannot exceed 250 characters</p>
        )}
        <div className="my-4">
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <ReactQuill
            className="w-full border rounded"
            theme="snow"
            value={description}
            onChange={handleChangeDesc}
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <div
            className="border rounded p-2 bg-white"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block font-medium">
            Tags:
          </label>
          <Select
            options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
            isMulti
            onChange={handleTagChange}
            value={selectedTags}
          />
        </div>
        <button
          onClick={handleCreateBlog}
          className="font-semibold text-slate-600 rounded-lg border-2 p-2 border-green-200 bg-green-300 "
        >
          Submit Blog
        </button>
      </div>
    </div>
  );
};

export default NewBlog;
