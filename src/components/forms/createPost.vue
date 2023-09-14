<template>
  <div class="modalWrapper">
    <form action="submit">
      <legend>Create a new post</legend>

      <label for="title">Title</label>
      <input
        v-model="formData.title"
        name="title"
        id="title"
        type="text"
        class="modalInput"
        maxlength="50"
        required
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
        @input="checkContentLength"
        required
      ></textarea>

      <label for="author">Author</label>
      <select
        v-model="formData.authorId"
        class="modalInput"
        name="author"
        id="author"
        required
      >
        <option v-for="author in authors" :value="author.id">
          {{ author.name }}
        </option>
      </select>

      <div v-if="validationIsActive">
        {{ validationMessage }}
      </div>

      <div class="warning" v-if="isContentTooLong">
        {{ "You reached max allowed content" }}
      </div>

      <div class="btnWrapper">
        <button class="submit" @click="submit" type="submit">Post</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import authors from "../../store/modules/authors";

export default {
  name: "Create",
  data() {
    return {
      formData: {
        title: "",
        body: "",
        created_at: new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString().split("T")[0],
        authorId: "",
      },
      validationMessage: "",
      validationIsActive: false,
      isContentTooLong: false,
    };
  },
  computed: {
    ...mapGetters(["authors", "searchTerm", "currentPage"]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "UPDATE_SERVER_RESPONSE"]),
    ...mapActions(["getAuthors", "createNewPostInDb", "setPosts"]),
    async submit(e) {
      e.preventDefault();

      if (
        this.formData.title.trim() === "" ||
        this.formData.body.trim() === "" ||
        this.formData.authorId === ""
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
        await this.createNewPostInDb(this.formData);
        await this.setPosts({ term: this.searchTerm, page: this.currentPage });

        this.CONTROL_MODAL();
        setTimeout(() => {
          this.UPDATE_SERVER_RESPONSE();
        }, 3000);
      }
    },
    closeModal() {
      this.CONTROL_MODAL();
    },
    checkContentLength() {
      if (this.formData.body.length >= 1000) {
        this.isContentTooLong = true;
      } else {
        this.isContentTooLong = false;
      }
    },
  },
  async created() {
    await this.getAuthors({});
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

.warning {
  color: red;
}
</style>
