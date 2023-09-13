import axios from "axios";

const instance = axios.create({
  baseURL: `${SERVER_ADDR}/authors`,
  headers: {
    "Content-Type": "application/json",
  },
});

let authorsAPI = (store) => {
  (store.fetchAuthorById = async (id) => {
    try {
      const author = await instance.get(`${id}`);
      return author.data;
    } catch  {
      throw new Error(
        "Failed to fetch data from a server. Please try again later."
      );
    }
  }),
    (store.fetchAuthors = async (term = "", page) => {
      try {
        const authors = await instance.get(``, {
          params: {
            q: term,
            _page: page,
            _limit: POSTS_PER_PAGE,
          },
        });
        return authors;
      } catch  {
        throw new Error(
          "Failed to fetch data from a server. Please try again later."
        );
      }
    }),
    (store.updateAuthorInDb = async (updatedAuthorData) => {
      try {
        const response = await instance.patch(
          `${updatedAuthorData.id}`,
          updatedAuthorData
        );
        return "Author updated successfully";
      } catch {
        throw new Error("There was a problem while updating an author.");
      }
    }),
    (store.createAuthorInDb = async (newAuthorData) => {
      try {
        const response = await instance.post(``, newAuthorData);
        return "Author created successfully";
      } catch {
        throw new Error("There was a problem while creating a post.");
      }
    }),
    (store.deleteAuthorInDb = async (authorId) => {
      try {
        await instance.delete(`${authorId}`);
        return "Author deleted successfully";
      } catch {
        throw new Error("There was a problem while deleting a post.");
      }
    });
};
export default authorsAPI;
