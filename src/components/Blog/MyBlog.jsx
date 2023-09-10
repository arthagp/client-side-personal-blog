'use client'
import React, { useEffect, useState } from 'react';
import { getMyBlog, deleteBlogById } from '@/app/api/fetch';
import Modal from "react-modal";
import { toast } from "react-toastify";
import ModalEditBlog from './ModalEditBlog';
import Cookies from 'js-cookie';

const MyBlog = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null); // State untuk menyimpan ID posting yang akan dihapus
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [editedBlogData, setEditedBlogData] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  // ketika button delete di klik maka akan ngesetModal true dan mengirim setPostIdToDelete menjadi id sesuai blog mana yng di klik, jadi intinya ketika di klik akan memasukan myblog.id di parameter openModal
  const openModal = (postId) => {
    setIsModalOpen(true);
    setPostIdToDelete(postId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchMyBlogs = async () => {
    try {
      const response = await getMyBlog();
      setMyBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //modal edit

  // Saat tombol "Edit Blog" di dalam loop map diklik, panggil fungsi ini
  const handleEditButtonClick = (postId) => {
    // Temukan data blog yang akan diedit berdasarkan postId
    const blogToEdit = myBlogs.find((blog) => blog.id === postId);
    if (blogToEdit) {
      setEditedBlogData(blogToEdit); // Simpan data blog yang akan diedit dalam state editedBlogData
      handleOpenModalEdit(); // Buka modal edit
    }
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true)
  }

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false)
  }

  //

  const handleDeleteBlog = async () => {
    try {
      const response = await deleteBlogById(postIdToDelete);
      if (response) {
        toast.success("delete blog success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal();
        fetchMyBlogs()
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

  const initUser = Cookies.get('username')

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const colorRandom = [
    'bg-red-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
    'bg-teal-200',
    'bg-orange-200',
    'bg-cyan-200',
    'bg-gray-200',
    'bg-lime-200',
  ];

  const customStyles = {
    overlay: {
      position: "fixed",
      backgroundColor: "rgba(255, 255, 255, 0.65)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className='grid grid-cols-3'>
        {myBlogs.map((myblog, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg m-4 w-96"
          >
            <img
              src="https://fakeimg.pl/350x200/"
              alt="fakeimage"
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-2 text-[#6941C6]">
              {initUser} - {formatDate(myblog.createdAt)}
            </p>
            <h2 className="mt-2 font-bold text-xl line-clamp-2">
              {myblog.title}
            </h2>
            <div className="mt-2 font-light line-clamp-3" dangerouslySetInnerHTML={{ __html: myblog.description }} />
            <div className="mt-4">
              {myblog.Tags.map((tag, index) => (
                <div
                  key={index}
                  className={`rounded-xl ${colorRandom[index % colorRandom.length] //untuk merandom color
                    } px-2 py-1 rounded-full mr-2 mb-2 text-sm inline-block`}
                  style={{ minWidth: `${tag.length * 10}px` }} //untuk menyesuaikan ukuran elemen setiap tag yang dibuat dengan panjang dari tag di kalikan 10 pixel, agar lebih dinamis
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEditButtonClick(myblog.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-md">
                Edit Blog
              </button>
              <button
                onClick={() => openModal(myblog.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
              >
                Delete Blog
              </button>
            </div>
          </div>
        ))}
        {openModalEdit && <ModalEditBlog
          postId={editedBlogData.id} // Kirim ID blog yang akan diedit
          initTitle={editedBlogData.title} // Gunakan data blog yang akan diedit sebagai nilai awal
          initDesc={editedBlogData.description} // Gunakan data blog yang akan diedit sebagai nilai awal
          initSelectTags={editedBlogData.Tags.map(tag => tag)}
          closeModal={handleCloseModalEdit}
          refresh={fetchMyBlogs}
        />}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Delete Confirmation"
          style={customStyles}
        >
          <div className=" rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDeleteBlog}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MyBlog;
