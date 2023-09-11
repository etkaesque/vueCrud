const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = {
  plugins: [createVuePlugin()],
  test: {
    globlas: true,
    enviroment: 'jsdom'
  }, 
  define: {
    SERVER_ADDR: JSON.stringify('http://localhost:3000'),
    POSTS_PER_PAGE: 3,
  }
};