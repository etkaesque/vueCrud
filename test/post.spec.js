import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
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
      SET_DELETE_NOTIFICATION: vi.fn(),
      CONTROL_ACTIVE_POST: vi.fn(),
    };

    state = {};

    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
  });

  it("post component renders prop data correctly", async () => {
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
    });

    const dateComponent = wrapper.findComponent({ name: "DateComponent" });

    const title = wrapper.find("h3").text();
    const authorName = wrapper.find("span").text();
    expect(title).toBe("Test Title");
    expect(authorName).toBe("Written by: Test Name");
    expect(dateComponent.props("created")).toBe("1802-02-23");
    expect(dateComponent.props("updated")).toBe("2023-02-23");
  });

  it("routes are working correctly", async () => {
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

  it("component mutations works correctly", async () => {
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
    expect(mutations.SET_DELETE_NOTIFICATION).toBeCalledWith(state, {
      success: "",
      message: "",
    });
    expect(mutations.CONTROL_ACTIVE_POST).toBeCalledWith(state, 1);
  });
});
