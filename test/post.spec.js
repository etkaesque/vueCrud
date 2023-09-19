import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import postComponent from "../src/components/post.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("postComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;

  beforeEach(() => {
    mutations = {
      CONTROL_MODAL: vi.fn(),
      CONTROL_ACTIVE_TAB: vi.fn(),
      CONTROL_ACTIVE_POST: vi.fn(),
    };

    getters = {
      activeTab: (state) => state.activeTab,
      activePostId: (state) => state.activePostId,
    };

    state = {
      activeTab: "",
      activePostId: "",
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
  });

  it("post component renders prop data correctly", () => {
    const wrapper = mount(postComponent, {
      propsData: {
        post: {
          id: 1,
          title: "Test Title",
          author: {
            name: "Test Name",
          },
          created_at: "1802-02-23",
          updated_at: "2023-02-23",
        },
      },
    });

    const title = wrapper.find("h3").text();
    expect(title).toBe("Test Title");

    const authorName = wrapper.find(".author-name").text();
    expect(authorName).toBe("Written by: Test Name");

    const dateText = wrapper.find("span").text();
    expect(dateText).toBe("Updated Date: 2023-02-23");
  });

  it("routes are working correctly", () => {
    const wrapper = shallowMount(postComponent, {
      propsData: {
        post: {
          id: 1,
          title: "Test Title",
          author: {
            name: "Test Name",
          },
          created_at: "1802-02-23",
          updated_at: "2023-02-23",
        },
      },
      mocks: {
        $route: { path: `post/1` },
      },
    });

    const wrapperPath = wrapper.vm.$route.path;
    wrapperPath.match(`post/1`);
  });

  it("component mutations works correctly", () => {
    const wrapper = shallowMount(postComponent, {
      localVue,
      store,
      propsData: {
        post: {
          id: 1,
          title: "Test Title",
          author: {
            name: "Test Name",
          },
          created_at: "1802-02-23",
          updated_at: "2023-02-23",
        },
      },
    });

    wrapper.vm.openModal();

    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();
    expect(mutations.CONTROL_ACTIVE_TAB).toBeCalledWith(state, "Edit");
    expect(mutations.CONTROL_ACTIVE_POST).toBeCalledWith(state, 1);
  });
});
