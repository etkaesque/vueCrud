<template>
  <div class="overlay" @click="dismissModal">
    <div class="modal">
      <KeepAlive>
        <component :is="activeTab" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Create from "./createPost.vue";
import Edit from "./editPost.vue";

export default {
  components: {
    Create,
    Edit,
  },
  computed: {
    ...mapGetters(["activeTab"]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL"]),
    dismissModal(event) {
      if (event.target.className === "overlay") {
        this.CONTROL_MODAL();
      }
    },
  },
};
</script>

<style>
.modal {
  min-width: 500px;
  min-height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7f4f4;
  padding: 10px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.overlay {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

legend {
  font-size: 1.5em;
  margin-bottom: 5px;
}

.success {
  color: green;
}

.failure {
  color: red;
}
</style>
