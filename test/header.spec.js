import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import headerComponent from "../src/components/header.vue";

describe("headerComponent", () => {
  it("header emits a value correctly", async () => {
    const wrapper = shallowMount(headerComponent, {
      propsData: {
        heading: "Posts",
        link: "/posts",
        button: "Posts",
      },
    });

    expect(wrapper.emitted("openModal")).toBeTruthy;
  });

  it("all props are displayed correctly", async () => {
    const wrapper = shallowMount(headerComponent, {
      propsData: {
        heading: "Posts",
        link: "/posts",
        button: "Posts",
      },
    });

    const routerLink = wrapper.find(".link");
    const toValue = routerLink.attributes("to");
    expect(toValue).toBe("/posts");

    const heading = wrapper.find("h1").text();
    const button = wrapper.find("button").text();
    expect(heading).toBe("Posts");
    expect(button).toBe("Posts");
  });

  it("button is working correctly", async () => {
    const wrapper = shallowMount(headerComponent, {
      propsData: {
        heading: "Posts",
        link: "/posts",
        button: "Posts",
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");
    wrapper.vm.openModal();
  });
});
