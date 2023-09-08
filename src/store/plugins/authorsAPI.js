import axios from "axios";

let authorsAPI = (store) => {
  (store.fetchAuthorById = async (id) => {
    try {
      const author = await axios.get(`${SERVER_ADDR}/authors/${id}`);
      return author.data;
    } catch (err) {
      throw new Error(
        "Failed to fetch data from a server. Please try again later."
      );
    }
  }),
    (store.fetchAuthors = async () => {
      try {
        const authors = await axios.get(`${SERVER_ADDR}/authors`);
        return authors.data;
      } catch (err) {
        throw new Error(
          "Failed to fetch data from a server. Please try again later."
        );
      }
    });
};
export default authorsAPI;
