import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import authorComponent from "../src/components/forms/editAuthor.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("authorComponent", () => {
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
      getAuthorById: vi.fn(),
    };

    getters = {
      currentAuthorId: (state) => state.currentAuthorId,
      serverResponse: (state) => state.serverResponse,
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
    const wrapper = shallowMount(authorComponent, {
      localVue,
      store,
    });

    const titleInput = wrapper.find("#name");
    titleInput.setValue("This is a name");

    expect(wrapper.vm.formData.name).toBe("This is a name");
  });

  it("validation is working correctly", async () => {
    const wrapper = shallowMount(authorComponent, {
      localVue,
      store,
    });

    wrapper.setData({ formData: { name: "1", id: "1" } });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    const validationText = wrapper.find(".validation-message").text();

    expect(validationText).toContain("Name should contain letters only");
  });

  it("actions are working correctly", async () => {
    const wrapper = shallowMount(authorComponent, {
      localVue,
      store,
    });

    wrapper.setData({
      formData: {
        id: "1",
        name: "Retrun of a Jedi",
        updated_at: "2023-02-23",
      },
    });
    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(wrapper.vm.validationIsActive).toBe(false);

    expect(actions.updateAuthor).toHaveBeenCalled(wrapper.vm.formData);
    expect(actions.getAuthors).toHaveBeenCalled();
  });

  it("mutations are working correctly", async () => {
    const wrapper = shallowMount(authorComponent, {
      localVue,
      store,
    });

    await wrapper.setData({
      formData: {
        name: "wwwwwwwwwwwwwwwwwwww",
      },
    });

    await wrapper.vm.submit({ preventDefault: vi.fn() });

    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();

    setTimeout(() => {
      expect(mutations.UPDATE_SERVER_RESPONSE).toHaveBeenCalled();
    }, 3000);
  });
});
