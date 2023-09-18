import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import editComponent from "../src/components/forms/editPost.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("editComponent", () => {
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
      updatePostInDb: vi.fn(),
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
    const wrapper = shallowMount(editComponent, {
      localVue,
      store,
    });

    const titleInput = wrapper.find("#title");
    titleInput.setValue("This is a test");

    const contentInput = wrapper.find("#content");
    contentInput.setValue("This is content");

    expect(wrapper.vm.formData.title).toBe("This is a test");
    expect(wrapper.vm.formData.body).toBe("This is content");
  });

  it("validation is working correctly", async () => {
    const wrapper = shallowMount(editComponent, {
      localVue,
      store,
    });

    wrapper.setData({ formData: { title: "1", body: "test" } });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    const validationText = wrapper.find(".validation-message").text();

    expect(validationText).toContain("Title should contain only letters");
  });

  it("actions are working correctly", async () => {
    const wrapper = shallowMount(editComponent, {
      localVue,
      store,
    });

    wrapper.setData({
      formData: {
        title: "Retrun of a Jedi",
        body: "testtesttesttesttesttesttesttest",
      },
    });
    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(actions.updatePostInDb).toHaveBeenCalled();
    expect(actions.getPostById).toHaveBeenCalled();
    expect(actions.setPosts).toHaveBeenCalled();
  });


  it("mutations are working correctly", async () => {
    const wrapper = shallowMount(editComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        title: "wwwwwwwwwwwwwwwwwwww",
        body: "aaaaaaaaaaaaaaaaaaaaaaaaaa",

      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();

    setTimeout(() => {
      expect(mutations.UPDATE_SERVER_RESPONSE).toHaveBeenCalled();
    }, 3000);
  });


});
