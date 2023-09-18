import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import createComponent from "../src/components/forms/createAuthor.vue";
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
      updateAuthor: vi.fn(),
      createAuthor: vi.fn(),
    };

    getters = {
      author: (state) => state.author,
      authorSearchTerm: (state) => state.authorSearchTerm,
      authorCurentPage: (state) => state.authorCurentPage,
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

    const inputElement = wrapper.find("#name");

    inputElement.setValue("Jonas");

    expect(wrapper.vm.formData.name).toBe("Jonas");
  });

  it("validation is working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    const inputElement = wrapper.find("#name");

    inputElement.setValue("1");

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    const validationText = wrapper.find(".validation-message").text();

    expect(validationText).toContain("Name should contain letters only");
  });

  it("actions are working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        name: "wwwwwwwwwwwwwwwwwwww",
        created_at: "2023-02-01",
        authorId: 1,
      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(actions.createAuthor).toHaveBeenCalled();
    expect(actions.getAuthors).toHaveBeenCalled();
  });

  it("mutations are working correctly", async () => {
    const wrapper = shallowMount(createComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        name: "wwwwwwwwwwwwwwwwwwww",
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
