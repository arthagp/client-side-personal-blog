"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { editBlogById, getAllTags, findBlogById } from "@/app/api/fetch";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";

const EditBlog = ({ postId, initLink }) => {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChangeTitle = (e) => {
    return setTitle(e.target.value);
  };

  const handleChangeDesc = (content) => {
    return setDescription(content);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleEditBlog = async () => {
    try {
      const tagIds = selectedTags.map((tag) => tag.value);
      const response = await editBlogById({
        postId,
        title,
        description,
        tagsId: tagIds,
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
        router.push(initLink)
        setTitle(response.data.title);
        setDescription(response.data.description);
        setSelectedTags([]);
      } else {
        toast.error("Something Wrong", {
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
      toast.error(`${error.message}`, {
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
  };

  const fetchBlogById = async () => {
    try {
      const response = await findBlogById(postId);
      setTitle(response.data.title);
      setDescription(response.data.description);
      const selectedTagIds = response.data.Tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));
      setSelectedTags(selectedTagIds);
    } catch (error) {
      console.log("Error fetching blog:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await getAllTags();
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchBlogById();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-4 bg-gray-100 rounded border mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
      <div className="bg-white p-4 rounded border">
        <label htmlFor="title" className="block font-medium mb-2">
          Title :
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={handleChangeTitle}
        />
        <div className="mb-4">
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
          onClick={handleEditBlog}
          className="font-semibold text-slate-600 rounded-lg border-2 p-2 border-yellow-200 bg-yellow-300 "
        >
          Edit Blog
        </button>
        <Link href={initLink}>
          <button className="font-semibold mx-5 text-slate-600 rounded-lg border-2 p-2 border-red-200 bg-red-300 ">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditBlog;
