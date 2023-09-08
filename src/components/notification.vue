<template>
  <div>
    <div v-if="serverResponse.success" class="notification success">
      <h2>Success</h2>

      <p>{{ serverResponse.message }}</p>
    </div>

    <div v-else-if="serverResponse.success == false" class="notification">
      <h2>Error</h2>

      <p>{{ serverResponse.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    Notification,
  },
  computed: {
    ...mapGetters(["serverResponse"]),
  },
  methods: {
    ...mapMutations(["DISMISS"]),
    dismissErr() {
      this.DISMISS();
    },
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
}

.success {
  background-color: greenyellow;
  color: black;
  min-width: 200px;
  min-height: 100px;
  width: max-content;
}
</style>
