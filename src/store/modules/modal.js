export default {
  state: {
    modal: false,
    activeTab: "",
    activePostId: "",
  },
  getters: {
    modal: (state) => state.modal,
    activeTab: (state) => state.activeTab,
    activePostId: (state) => state.activePostId,
  },
  mutations: {
    CONTROL_MODAL(state) {
      state.modal = !state.modal;
    },
    CONTROL_ACTIVE_TAB(state, tab) {
      state.activeTab = tab;
    },
    CONTROL_ACTIVE_POST(state, activePostId) {
      state.activePostId = activePostId;
    },
  },

  actions: {},
};
