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
      authors: (state) => state.authors,
      currentAuthorId: (state) => state.currentAuthorId,
      authorSearchTerm: (state) => state.authorSearchTerm,
      authorCurentPage: (state) => state.authorCurentPage,
      posts: (state) => state.posts,
      currentPage: (state) => state.currentPage,
      searchTerm: (state) => state.searchTerm,
      deleteNotification: (state) => state.deleteNotification,
      activeFor: (state) => state.activeFor,
    };

    actions = {
      deletePostInDb: vi.fn(),
      setPosts: vi.fn(),
      deleteAuthorById: vi.fn(),
      getAuthors: vi.fn(),
    };

    state = {
      activeFor: `Author`,
      authorCurentPage: 1,
      authorSearchTerm: "",
      authors: [{
        name: "Edgaras",
        id:1,
        created_at: "2023-01-01"
      }],
      currentAuthorId: 1,
      currentPage: 1,
      deleteNotification: {
        message: "Delete is a success",
        success: true,
      },
      posts: [],
      searchTerm: "",
    };

    store = new Vuex.Store({
      mutations,
      state,
      getters,
      actions,
    });
  });

  it("components recieve states from getters correctly", async () => {
    const wrapper = shallowMount(deleteNotification, {
      localVue,
      store,
    });

    const deleteMessage = wrapper.find("p").text();
    expect(deleteMessage).toBe("Delete is a success");
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
    expect(actions.setPosts).toHaveBeenCalled();
  });
});
