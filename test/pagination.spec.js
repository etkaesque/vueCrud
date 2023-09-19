import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import paginationComponent from "../src/components/pagination.vue";

import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("paginationComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;

  beforeEach(() => {
    mutations = {
      SET_AUTHOR_CURRENT_PAGE: vi.fn(),
      SET_CURRENT_PAGE: vi.fn(),
    };

    getters = {
      currentPage: (state) => state.currentPage,
      authorCurentPage: (state) => state.authorCurentPage,
    };

    state = {
      currentPage: 1,
      authorCurentPage: 1,
    };

    store = new Vuex.Store({
      mutations,
      state,
      getters,
    });
  });

  it("emits 'changePage' event when first button is clicked", () => {
    const wrapper = mount(paginationComponent, {
      propsData: {
        fullArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        currentPage: 5,
      },
    });
    const button = wrapper.find("#firstBtn");
    button.trigger("click");
    expect(wrapper.emitted("changePage")).toBeTruthy();
  });

  it("emits 'changePage' event when last button is clicked", () => {
    const wrapper = mount(paginationComponent, {
      propsData: {
        fullArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        currentPage: 5,
      },
    });
    const button = wrapper.find("#lastBtn");
    button.trigger("click");
    expect(wrapper.emitted("changePage")).toBeTruthy();
  });

  it("applies 'selected' class to the current page button", () => {
    const wrapper = shallowMount(paginationComponent, {
      propsData: {
        fullArray: [1, 2, 3],
        currentPage: 2,
      },
    });

    const currentPageButton = wrapper.find(".selected");
    expect(currentPageButton.exists()).toBe(true);
  });

  it("calculates dinamic array correctly", () => {
    const wrapper = shallowMount(paginationComponent, {
      propsData: {
        fullArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        currentPage: 5,
      },
    });

    expect(wrapper.vm.lastPage).toEqual(10);
    expect(wrapper.vm.dinamicArray).toEqual([4, 5, 6]);
  });
});
