<template>
  <div class="modalWrapper">
    <form action="submit">
      <legend>Edit this author</legend>

      <label for="name">Name</label>
      <input
        v-model="formData.name"
        name="name"
        id="name"
        type="text"
        class="modalInput"
        maxlength="50"
      />

      <div v-if="validationIsActive">
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
  name: "EditAuthor",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        updated_at: new Date().toISOString().split("T")[0],
      },
      validationMessage: "Please enter all fields",
      validationIsActive: false,
    };
  },
  computed: {
    ...mapGetters([
      "currentAuthorId",
      "serverResponse",
      "author",
      "authorSearchTerm",
      "authorCurentPage",
    ]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "UPDATE_SERVER_RESPONSE"]),
    ...mapActions(["getAuthors", "getAuthorById", "updateAuthor"]),
    async submit(e) {
      e.preventDefault();

      if (this.formData.name.trim() == "") {
        this.validationMessage = "Please enter all fields"
        this.validationIsActive = true;
      } else if (!/^[a-zA-Z]+$/.test(this.formData.name)) {
        this.validationMessage = "Name should contain letters only"
        this.validationIsActive = true;
      } else if(this.formData.name.length < 3) {
        this.validationMessage = "Please enter at least 3 letters"
        this.validationIsActive = true;
      } else {
        this.validationIsActive = false;

        await this.updateAuthor(this.formData);
        await this.getAuthors({
          term: this.authorSearchTerm,
          page: this.authorCurentPage,
        });

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
    await this.getAuthorById(this.currentAuthorId);
    this.formData.name = this.author.name;
    this.formData.id = this.author.id;
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
