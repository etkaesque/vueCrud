export default {
  state: {
    deleteNotification: { success: "", message: "" },
    isDeleteNotificationActive: false,
    serverResponse: { success: "", message: ""},
    IsServerResponseActive: false,
  },
  getters: {
    isDeleteNotificationActive: (state) => state.isDeleteNotificationActive,
    deleteNotification: (state) => state.deleteNotification,
    serverResponse: (state) => state.serverResponse,
    IsServerResponseActive: (state) => state.IsServerResponseActive
  },
  mutations: {
    CONTROL_DELETE_NOTIFICATION(state) {
      state.isDeleteNotificationActive = !state.isDeleteNotificationActive;
    },
    CONTROL_SERVER_NOTIFICATION(state) {
      state.IsServerResponseActive = !state.IsServerResponseActive
    },
    SET_DELETE_NOTIFICATION(state, deleteNotification) {
      state.deleteNotification = deleteNotification;
    },
    UPDATE_SERVER_RESPONSE(state, response) {
      if (response === undefined) {
        state.serverResponse = { success: "", message: "" };
      } else {
        state.serverResponse = response;
      }
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
