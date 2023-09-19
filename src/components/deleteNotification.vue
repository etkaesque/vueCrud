<template>
  <div>
    <div class="overlay" @click="dismissFromOverlay">
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
      "currentAuthorId",
      "activeFor"
    ]),
  },
  methods: {
    ...mapMutations([
      "CONTROL_DELETE_NOTIFICATION",
      "UPDATE_SERVER_RESPONSE",
    ]),
    ...mapActions([
      "deletePostInDb",
      "deleteAuthorById",
    ]),

    async clean() {
      this.CONTROL_DELETE_NOTIFICATION()
      setTimeout(() => {
          this.UPDATE_SERVER_RESPONSE();
        }, 3000);
    },
    async deletePost() {
      await this.deletePostInDb(this.activePostId); 
      if (this.$route.path !== "/posts") {
        this.$router.replace("/posts")}
      await this.clean()  
    },
    async deleteAuthor() {
      await this.deleteAuthorById(this.currentAuthorId);
      await this.clean()
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

<style>
.notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ecb3b3;
  padding: 10px 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 50;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 200px;
}

.loaderWrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 50;
  padding: 20px;
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