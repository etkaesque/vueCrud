<template>
  <div class="modalWrapper">
    <form action="submit">
      <legend>Edit Post</legend>

      <label for="title">Title</label>
      <input
        v-model="formData.title"
        name="title"
        id="title"
        type="text"
        class="modalInput"
        maxlength="50"
      />

      <label for="content">Content</label>
      <textarea
        v-model="formData.body"
        name="content"
        id="content"
        cols="50"
        rows="20"
        class="modalInput"
        maxlength="1000"
      ></textarea>

      <div v-if="validationIsActive" class="validation-message">
        {{ validationMessage }}
      </div>

      <div class="btnWrapper">
        <button class="submit" @click="submit" type="submit">Edit</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Edit",

  data() {
    return {
      formData: {
        postId: "",
        id: "",
        title: "",
        body: "",
        updated_at: new Date().toISOString().split("T")[0],
      },
      validationMessage: "Please enter all fields",
      validationIsActive: false,
    };
  },
  computed: {
    ...mapGetters([
      "activePostId",
      "serverResponse",
      "currentPost",
      "searchTerm",
      "currentPage",
    ]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "UPDATE_SERVER_RESPONSE"]),
    ...mapActions(["getAuthors", "updatePostInDb", "getPostById", "setPosts"]),
    async submit(e) {
      e.preventDefault();

      if (
        this.formData.title.trim() === "" ||
        this.formData.body.trim() === ""
      ) {
        this.validationMessage = "Please enter all fields";
        this.validationIsActive = true;
      } else if (!/^[a-zA-Z.]+(?:\s[a-zA-Z.]+)*$/.test(this.formData.title)) {
        this.validationMessage = "Title should contain only letters";
        this.validationIsActive = true;
      } else if (this.formData.title.length < 3) {
        this.validationMessage = "Title should be at least 3 characters long";
        this.validationIsActive = true;
      } else if (this.formData.body.length < 10) {
        this.validationMessage =
          "Content should be at least 10 characters long";
        this.validationIsActive = true;
      } else {
        this.validationIsActive = false;
        await this.updatePostInDb(this.formData);
        await this.setPosts({ term: this.searchTerm, page: this.currentPage });
        await this.getPostById(this.activePostId);

        this.CONTROL_MODAL();
        setTimeout(() => {
          this.UPDATE_SERVER_RESPONSE();
        }, 3000);
      }
    },
    closeModal() {
      this.CONTROL_MODAL();
    },
  },
  async created() {
    await this.getPostById(this.activePostId);
    this.formData.postId = this.activePostId;
    this.formData.title = this.currentPost.title;
    this.formData.body = this.currentPost.body;
  },
};
</script>

<style scoped>
.modal {
  max-width: 500px;
  max-height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ece5e5;
  padding: 10px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.modalWrapper {
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  height: 100%;
}

label {
  font-size: 1.15rem;
}

.modalInput {
  max-width: 75%;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
  border: none;
  padding: 10px 20px;
  resize: none;
}

.btnWrapper {
  height: 100%;
}
</style>
