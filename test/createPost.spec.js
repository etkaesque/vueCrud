import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import createComponent from "../src/components/forms/createPost.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("createComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;
  let actions;

  beforeEach(() => {
    mutations = {
      CONTROL_MODAL: vi.fn(),
      UPDATE_SERVER_RESPONSE: vi.fn(),
    };

    actions = {
      getAuthors: vi.fn(),
      createNewPostInDb: vi.fn(),
      getPostById: vi.fn(),
      setPosts: vi.fn(),
    };

    getters = {
      activePostId: (state) => state.activePostId,
      serverResponse: (state) => state.serverResponse,
      currentPost: (state) => state.currentPost,
      searchTerm: (state) => state.searchTerm,
      currentPage: (state) => state.currentPage,
    };

    state = {};

    store = new Vuex.Store({
      mutations,
      state,
      getters,
      actions,
    });
  });

  it("inputs are working", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        authorId: 1,
      },
    });

    const title = wrapper.find("#title");
    title.setValue("wdawdwadwa");

    const body = wrapper.find("#content");
    body.setValue("wdawdwadadawdwaddwa");

    expect(wrapper.vm.formData.title).toBe("wdawdwadwa");
    expect(wrapper.vm.formData.body).toBe("wdawdwadadawdwaddwa");
    expect(wrapper.vm.formData.authorId).toBe(1);
  });

  it("validation is working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        title: "1",
        body: "This is content",
        authorId: 1,
      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    const validationText = wrapper.find(".validation-message").text();

    expect(validationText).toContain("Title should contain only letters");
  });

  it("actions are working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        title: "wwwwwwwwwwwwwwwwwwww",
        body: "This is content",
        authorId: 1,
      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(actions.createNewPostInDb).toHaveBeenCalled();
    expect(actions.setPosts).toHaveBeenCalled();
  });

  it("mutations are working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        title: "wwwwwwwwwwwwwwwwwwww",
        body: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "2023-02-01",
        authorId: 1,
      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();

    setTimeout(() => {
      expect(mutations.UPDATE_SERVER_RESPONSE).toHaveBeenCalled();
    }, 3000);
  });
});
