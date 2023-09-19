<template>
  <div>
    <router-view></router-view>

    <GeneralNotification
      v-if="serverResponse.message.length !== 0"
    ></GeneralNotification>
    <DeleteNotification v-if="isDeleteNotificationActive"></DeleteNotification>
    <Modal v-if="modal"></Modal>
    <Loader v-if="isLoading"></Loader>
    
  </div>
</template>

<script>

import Loader from "./components/loader.vue"
import GeneralNotification from "./components/notification.vue";
import Modal from "./components/modal.vue";
import DeleteNotification from "./components/deleteNotification.vue";

import Home from "./views/Home.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    GeneralNotification,
    Modal,
    DeleteNotification,
    Home,
    Loader
  },
  computed: {
    ...mapGetters(["isLoading", "serverResponse", "modal", "isDeleteNotificationActive"]),
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

.cardWrap {
  display: flex; 
  flex-wrap: wrap;
  gap: 20px;
}

.cardWrap div {
 display: flex;
 flex-direction: column;
 justify-content: space-between;
}

</style>