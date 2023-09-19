import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import modalComponent from "../src/components/modal.vue";
import editPostForm from "../src/components/forms/editPost.vue";
import createPostForm from "../src/components/forms/createPost.vue";
import editAuthorForm from "../src/components/forms/editAuthor.vue";
import createAuthorForm from "../src/components/forms/createAuthor.vue";
import modalModel from "../src/store/modules/modal";

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
      CONTROL_ACTIVE_TAB: vi.fn(),
      CONTROL_ACTIVE_POST: vi.fn(),
    };

    getters = {
      modal: (state) => state.modal,
      activeTab: (state) => state.activeTab,
      activePostId: (state) => state.activePostId,
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

  it(" 'edit post'  form renders when activeTab defined", () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    const renderedComponent = wrapper.findComponent(editPostForm);
    expect(renderedComponent.exists()).toBe(true);
  });

  it(" 'create post' form renders when activeTab defined", async () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    await modalModel.mutations.CONTROL_ACTIVE_TAB(state, "Create");
    expect(store.getters.activeTab).toBe("Create");
    const renderedComponent = wrapper.findComponent(createPostForm);
    expect(renderedComponent.exists()).toBe(true);
  });

  it(" 'edit author' form renders when activeTab defined", async () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    await modalModel.mutations.CONTROL_ACTIVE_TAB(state, "EditAuthor");
    expect(store.getters.activeTab).toBe("EditAuthor");
    const renderedComponent = wrapper.findComponent(editAuthorForm);
    expect(renderedComponent.exists()).toBe(true);
  });

  it(" 'create author' form renders when activeTab defined", async () => {
    const wrapper = shallowMount(modalComponent, {
      localVue,
      store,
    });

    await modalModel.mutations.CONTROL_ACTIVE_TAB(state, "CreateAuthor");
    expect(store.getters.activeTab).toBe("CreateAuthor");
    const renderedComponent = wrapper.findComponent(createAuthorForm);
    expect(renderedComponent.exists()).toBe(true);
  });

  it("modal closes when overlay is hit", () => {
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
