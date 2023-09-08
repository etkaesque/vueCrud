<template>
  <div>
    <router-view></router-view>
    <GeneralNotification v-if="serverResponse.message.length !== 0"></GeneralNotification>
    <DeleteNotification v-if="isDeleteNotificationActive"></DeleteNotification>
    <Modal v-if="modal"></Modal>
  </div>
</template>

<script>
import Vue from "vue";
import GeneralNotification from "./components/notification.vue";
import Modal from "./components/modal/modal.vue"
import DeleteNotification from "./components/deleteNotification.vue";
import vueDebounce from "vue-debounce"
import { mapGetters } from "vuex";

Vue.use(vueDebounce, {
  listenTo: ["input", "keyup"],
});

export default {
  components: {
    GeneralNotification,
    Modal,
    DeleteNotification
  },
  computed: {
    ...mapGetters(["serverResponse", "modal", "isDeleteNotificationActive"]),
  },
};
</script>

<style>
.app {
background-color: rgb(248, 253, 252);
max-width: 1230px;
margin-left: auto;
margin-right: auto;
height: 100vh;
padding: 0px 20px;
padding-bottom: 100px;
}

body {
  margin: 0px;
}
</style>
