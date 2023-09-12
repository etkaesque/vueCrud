export default {
  state: {
    activeFor: "",
    deleteNotification: { success: "", message: "" },
    isDeleteNotificationActive: false,
    serverResponse: { success: "", message: "" },
    IsServerResponseActive: false,
  },
  getters: {
    isDeleteNotificationActive: (state) => state.isDeleteNotificationActive,
    deleteNotification: (state) => state.deleteNotification,
    serverResponse: (state) => state.serverResponse,
    IsServerResponseActive: (state) => state.IsServerResponseActive,
    activeFor: (state) => state.activeFor,
  },
  mutations: {
    CONTROL_DELETE_NOTIFICATION(state) {
      state.isDeleteNotificationActive = !state.isDeleteNotificationActive;
    },
    CONTROL_SERVER_NOTIFICATION(state) {
      state.IsServerResponseActive = !state.IsServerResponseActive;
    },
    SET_DELETE_NOTIFICATION(state, deleteNotification) {
      state.deleteNotification = deleteNotification;
    },
    UPDATE_SERVER_RESPONSE(state, response) {
      console.log("labas");

      if (response === undefined) {
        state.serverResponse = { success: "", message: "" };
        console.log("hillo", state.serverResponse);
      } else {
        state.serverResponse = response;
      }
    },
    SET_ACTIVE_FOR(state, type) {
      state.activeFor = type;
    },
    DISMISS(state) {
      state.serverResponse = { success: "", message: "" };
    },
  },
  actions: {
    setDeleteNotification({ commit }, deleteNotification) {
      commit("SET_DELETE_NOTIFICATION", deleteNotification);
    },
    setServerResponse({ commit }, response) {
      commit("UPDATE_SERVER_RESPONSE", response);
    },
  },
};
