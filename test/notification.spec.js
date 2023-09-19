import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import notificationComponent from "../src/components/notification.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("notificationComponent", () => {
  let store;
  let mutations;
  let state;
  let getters;
  let actions;

  beforeEach(() => {
    mutations = {
      DISMISS: vi.fn(),
    };

    getters = {
      serverResponse: (state) => state.serverResponse,
    };

    state = {
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

  it("recieves state from getters correctly",  () => {
    const wrapper = shallowMount(notificationComponent, {
      localVue,
      store,
    });

    const paragraph = wrapper.find("p");
    const paragraphText = paragraph.text();
    expect(paragraphText).toBe("Success");
  });

  it("nofitication rendens correctly",  () => {
    const wrapper = shallowMount(notificationComponent, {
      localVue,
      store,
    });

    expect(wrapper.find(".notification").exists()).toBe(true);
  });

  it("component mutations works correctly",  () => {
    const wrapper = shallowMount(notificationComponent, {
      localVue,
      store,
    });

    wrapper.vm.dismissErr();
    expect(mutations.DISMISS).toHaveBeenCalled();
  });
});
