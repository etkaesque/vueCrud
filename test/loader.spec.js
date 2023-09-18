import { shallowMount } from "@vue/test-utils";
import loaderComponent from "../src/components/loader.vue";
import { describe, it, expect} from "vitest";

describe("loaderComponent", () => {
  it("renders the loader and overlay elements", () => {
    const wrapper = shallowMount(loaderComponent);
    expect(wrapper.find(".loaderOverlay").exists()).toBe(true);
    expect(wrapper.find(".loader").exists()).toBe(true);
  });
})