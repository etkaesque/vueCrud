import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import paginationComponent from "../src/components/pagination.vue";

describe("paginationComponent", () => {
  it("emits 'changePage' event when a page button is clicked", async () => {
    const wrapper = shallowMount(paginationComponent, {
      propsData: {
        fullArray: [1, 2, 3],
        currentPage: 1,
      },
    });

    wrapper.findAll("button").trigger("click");
    expect(wrapper.emitted("changePage")).toBeTruthy();
  });

  it("calculates dinamic array correctly", async () => {
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
