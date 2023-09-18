import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import modalComponent from "../src/components/modal.vue";
import editForm from "../src/components/forms/editPost.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("modalComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;
  let actions;

  beforeEach(() => {
    mutations = {
      CONTROL_MODAL: vi.fn(),
    };

    getters = {
      activeTab: (state) => state.activeTab,
      serverResponse: (state) => state.serverResponse,
      modal: (state) => state.modal,
    };

    state = {
      modal: false,
      activeTab: "Edit",
      serverResponse: {
        success: true,
        message: "Success",
      },
    };

    store = new Vuex.Store({
      mutations,
      state,
      getters,
      actions,
    });
  });

  it(" 'edit' form renders when activeTab defined", async () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    const renderedComponent = wrapper.findComponent(editForm);
    expect(renderedComponent.exists()).toBe(true);
  });

  it("modal closes when overlay is hit", async () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    const event = {
      target: {
        className: "overlay",
      },
    };

    wrapper.vm.dismissModal(event);
    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();
  });
});
