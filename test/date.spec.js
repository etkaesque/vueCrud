import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import dateComponent from "../src/components/date.vue";

describe("dateComponent", () => {
  it("props are displayed correctly", async () => {
    const wrapper = shallowMount(dateComponent, {
      propsData: {
        created: "2023-01-01",
        updated: "2023-10-01",
      },
    });

    const dateText = wrapper.find("span").text();

    expect(dateText).toBe("Updated Date: 2023-10-01");
  });
});
