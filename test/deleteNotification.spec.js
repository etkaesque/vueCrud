import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import deleteNotification from "../src/components/deleteNotification.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("deleteNotification", () => {
  let store;
  let mutations;
  let state;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
      activePostId: (state) => state.authors,
      currentAuthorId: (state) => state.currentAuthorId,
      activeFor: (state) => state.activeFor,
    };

    mutations = {
      UPDATE_SERVER_RESPONSE: vi.fn(),
      CONTROL_DELETE_NOTIFICATION: vi.fn()
    }

    actions = {
      deletePostInDb: vi.fn(),
    };

    state = {
      activeFor: `Author`,
      currentAuthorId: 1,
      activePostId:1,
    };

    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  it("actions are working correctly", async () => {
    const wrapper = shallowMount(deleteNotification, {
      localVue,
      store,
      mocks: {
        $route: { path: `/posts` },
      },
    });

    await wrapper.vm.deletePost();
    expect(actions.deletePostInDb).toHaveBeenCalled();

  });
});
