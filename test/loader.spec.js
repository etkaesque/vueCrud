import { shallowMount, createLocalVue } from "@vue/test-utils";
import loaderComponent from "../src/components/loader.vue";
import { describe, it, vi, expect, beforeEach } from "vitest";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("loaderComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;

  beforeEach(() => {
    mutations = {
      SET_LOADING: vi.fn(),
    };

    getters = {
      isLoading: (state) => state.isLoading,
    };

    state = {
      isLoading: false,
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
  });

  it("renders the loader and overlay elements", () => {
    const wrapper = shallowMount(loaderComponent);
    expect(wrapper.find(".loaderOverlay").exists()).toBe(true);
    expect(wrapper.find(".loader").exists()).toBe(true);
  });

  it("mutation is called correctly", () => {
    store.commit("SET_LOADING");
    expect(mutations.SET_LOADING).toHaveBeenCalled();
  });
});
