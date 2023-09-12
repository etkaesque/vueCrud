<template>
  <div>
    <div
      v-if="deleteNotification.success === true"
      class="notification success"
    >
      <h2>Success</h2>
      <p>{{ deleteNotification.message }}</p>
    </div>

    <div v-else-if="deleteNotification.success === false" class="notification">
      <h2>Failure</h2>
      <p>{{ deleteNotification.message }}</p>
    </div>

    <div v-else class="overlay" @click="dismissFromOverlay">
      <div v-if="activeFor === `Post`" class="notification">
        <div>
          <h2>Warning!</h2>
          <p>
            This post will be deleted. Ar you sure you want to delete this post?
          </p>
        </div>

        <div>
          <button @click="deletePost">Yes</button>
          <button @click="DISMISS">No</button>
        </div>
      </div>

      <div v-if="activeFor === `Author`" class="notification">
        <div>
          <h2>Warning!</h2>
          <p>
            This author will be deleted. Ar you sure you want to delete this
            author?
          </p>
        </div>

        <div>
          <button @click="deleteAuthor">Yes</button>
          <button @click="DISMISS">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "activePostId",
      "deleteNotification",
      "searchTerm",
      "currentPage",
      "posts",
      "activeFor",
      "currentAuthorId",
      "authorSearchTerm",
      "authorCurentPage",
      "authors",
    ]),
  },
  methods: {
    ...mapMutations([
      "CONTROL_DELETE_NOTIFICATION",
      "SET_DELETE_NOTIFICATION",
      "SET_CURRENT_PAGE",
      "CONTROL_CURRENT_AUTHOR",
      "UPDATE_SERVER_RESPONSE",
    ]),
    ...mapActions([
      "deletePostInDb",
      "setPosts",
      "deleteAuthorById",
      "getAuthors",
    ]),
    async deletePost() {
      console.log(this.posts.length);

      if (this.posts.length === 1) {
        await this.deletePostInDb(this.activePostId);

        if (this.deleteNotification.success) {
          await this.setPosts({
            term: this.searchTerm,
            page: this.currentPage - 1,
          });
        }
      } else {
        await this.deletePostInDb(this.activePostId);

        if (this.deleteNotification.success) {
          await this.setPosts({
            term: this.searchTerm,
            page: this.currentPage,
          });
        }
      }

      if (
        this.$route.path !== "/posts" &&
        this.deleteNotification.success == true
      ) {
        this.$router.replace("/posts");
        setTimeout(() => {
          this.CONTROL_DELETE_NOTIFICATION();
          this.SET_DELETE_NOTIFICATION({ success: "", message: "" });
        }, 2000);
      } else if (
        this.$route.path !== "/posts" &&
        this.deleteNotification.success == false
      ) {
        setTimeout(() => {
          this.CONTROL_DELETE_NOTIFICATION();
          this.SET_DELETE_NOTIFICATION({ success: "", message: "" });
        }, 2000);
      } else {
        setTimeout(() => {
          this.CONTROL_DELETE_NOTIFICATION();
          this.SET_DELETE_NOTIFICATION({ success: "", message: "" });
        }, 2000);
      }
    },
    async deleteAuthor() {
      if (this.authors.length === 1) {
        await this.deleteAuthorById(this.currentAuthorId);

        if (this.deleteNotification.success) {
          await this.getAuthors({
            term: this.authorSearchTerm,
            page: this.authorCurentPage - 1,
          });
        }
      } else {
        await this.deleteAuthorById(this.currentAuthorId);

        if (this.deleteNotification.success) {
          await this.getAuthors({
            term: this.authorSearchTerm,
            page: this.authorCurentPage,
          });
        }
      }

      setTimeout(() => {
        this.CONTROL_DELETE_NOTIFICATION();
        this.SET_DELETE_NOTIFICATION({ success: "", message: "" });
      }, 2000);
    },

    DISMISS() {
      this.CONTROL_DELETE_NOTIFICATION();
    },
    dismissFromOverlay(event) {
      if (event.target.className === "overlay") {
        this.CONTROL_DELETE_NOTIFICATION();
      }
    },
  },
  created() {
    this.UPDATE_SERVER_RESPONSE();
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ecb3b3;
  padding: 10px 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 200px;
}

.success {
  background-color: greenyellow;
  color: black;
  min-width: 200px;
  min-height: 100px;
  width: max-content;
}

.overlay {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
