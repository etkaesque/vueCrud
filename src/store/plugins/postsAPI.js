import axios from "axios";

let postsAPI = (store) => {
  (store.fetchPosts = async (term = "", page) => {
    try {
      const posts = await axios.get(`${SERVER_ADDR}/posts`, {
        params: {
          _expand: "author",
          q: term,
          _page: page,
          _limit: POSTS_PER_PAGE,
        },
      });

      return posts;
    } catch {
      throw new Error(
        "Failed to fetch data from a server. Please try again later."
      );
    }
  }),
    (store.fetchPostById = async (id) => {
      try {
        const post = await axios.get(
          `${SERVER_ADDR}/posts/${id}?_expand=author`
        );
        return post.data;
      } catch {
        throw new Error(
          "Failed to fetch data from a server. Please try again later."
        );
      }
    }),
    (store.createNewPost = async (newPostData) => {
      try {
        const response = await axios.post(`${SERVER_ADDR}/posts`, newPostData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response;
      } catch {
        throw new Error("There was a problem while creating a post.");
      }
    }),
    (store.updatePost = async (updatedPostData) => {
      try {
        const response = await axios.patch(
          `${SERVER_ADDR}/posts/${updatedPostData.postId}`,
          updatedPostData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response;
      } catch {
        throw new Error("There was a problem while updating a post.");
      }
    }),
    (store.deletePost = async (postId) => {
      try {
        const response = await axios.delete(`${SERVER_ADDR}/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return "Post deleted successfully";
      } catch {
        throw new Error("There was a problem while deleting a post.");
      }
    });
};
export default postsAPI;
