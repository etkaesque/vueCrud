const { createVuePlugin } = require("vite-plugin-vue2");

module.exports = {
  plugins: [createVuePlugin()],
  test: {
    environment: "jsdom",
  },
  define: {
    SERVER_ADDR: JSON.stringify("http://localhost:3000"),
    POSTS_PER_PAGE: 10,
  },
};
