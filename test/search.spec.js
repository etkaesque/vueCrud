import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import searchComponent from "../src/components/search.vue";

describe("searchComponent", () => {
  it("searchTerm data property updates correctly", async () => {
    const wrapper = shallowMount(searchComponent);
    const inputElement = wrapper.find("input");
    await inputElement.setValue("This is a test");
    expect(wrapper.vm.searchTerm).toBe("This is a test");
  });

  it("search component emmits searchTerm correctly", async () => {
    const wrapper = shallowMount(searchComponent);
    const inputElement = wrapper.find("input");
    await inputElement.setValue("This is a test");
    expect(wrapper.emitted("search")).toBeTruthy;
  });
});
