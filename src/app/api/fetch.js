import { instance } from "./axios";

const userLogin = async (username, password) => {
  try {
    const response = await instance.post("/login", { username, password });
    return response;
  } catch (error) {
    throw (
      new Error(error.response.data.message) ||
      console.log("Something Went Wrong")
    );
  }
};

const userRegister = async (username, password) => {
  try {
    const response = await instance.post("/register", { username, password });
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("An error occurred during registration:", error);
      throw new Error("Something Went Wrong");
    }
  }
};

const findUserAndId = async () => {
  try {
    const response = await instance.get("/user-and-id");
    return response.data;
  } catch (error) {
    throw (
      new Error(error.response.data.message) ||
      console.log("Something Went Wrong")
    );
  }
};

const findAllBlog = async () => {
  try {
    const response = await instance.get("/all-post");
    return response.data;
  } catch (error) {
    throw (
      new Error(error.response.data.message) ||
      console.log("Something Went Wrong")
    );
  }
};

const findBlogById = async (postId) => {
  try {
    const response = await instance.get(`/detail-post/${postId}`)
    return response
  } catch (error) {
    throw (
      new Error(error.response.data.message) ||
      console.log("Something Went Wrong")
    );
  }
}

module.exports = { userLogin, userRegister, findAllBlog, findUserAndId, findBlogById};
