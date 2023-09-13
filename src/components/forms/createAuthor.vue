<template>
  <div class="modalWrapper">
    <form action="submit">
      <legend>Create new author</legend>

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
        <button class="submit" @click="submit" type="submit">Create</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "CreateAuthor",
  data() {
    return {
      formData: {
        name: "",
        created_at: new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString().split("T")[0],
      },
      validationMessage: "",
      validationIsActive: false,
    };
  },
  computed: {
    ...mapGetters([
      "serverResponse",
      "author",
      "authorSearchTerm",
      "authorCurentPage",
    ]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "UPDATE_SERVER_RESPONSE"]),
    ...mapActions(["getAuthors", "updateAuthor", "createAuthor"]),
    async submit(e) {
      e.preventDefault();

      if (this.formData.name.trim() == "") {
        this.validationMessage = "Please enter all fields";
        this.validationIsActive = true;
      } else if (!/^[a-zA-Z]+$/.test(this.formData.name)) {
        this.validationMessage = "Name should contain letters only";
        this.validationIsActive = true;
      } else if (this.formData.name.length < 3) {
        this.validationMessage = "Please enter at least 3 letters";
        this.validationIsActive = true;
      } else {
        this.validationIsActive = false;

        await this.createAuthor(this.formData);

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
