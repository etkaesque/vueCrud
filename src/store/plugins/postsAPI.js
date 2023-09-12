import axios from "axios";

const instance = axios.create({
  baseURL: `${SERVER_ADDR}/posts`,
  headers: {
    "Content-Type": "application/json",
  },
});

let postsAPI = (store) => {
  (store.fetchPosts = async (term = "", page) => {
    try {
      const posts = await instance.get(``, {
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
        const post = await instance.get(`/${id}?_expand=author`);
        return post.data;
      } catch {
        throw new Error(
          "Failed to fetch data from a server. Please try again later."
        );
      }
    }),
    (store.createNewPost = async (newPostData) => {
      try {
        await instance.post(``, newPostData);
        return "Post created successfully";
      } catch {
        throw new Error("There was a problem while creating a post.");
      }
    }),
    (store.updatePost = async (updatedPostData) => {
      try {
        await instance.patch(
          `${updatedPostData.postId}`,
          updatedPostData
        );
        return "Post updated successfully";
      } catch {
        throw new Error("There was a problem while updating a post.");
      }
    }),
    (store.deletePost = async (postId) => {
      try {
        await instance.delete(`${postId}`);
  
        return "Post deleted successfully";
      } catch {
        throw new Error("There was a problem while deleting a post.");
      }
    });
};
export default postsAPI;
