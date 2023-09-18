import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import authorComponent from "../src/components/author.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("authorComponent", () => {
  let store;
  let mutations;
  let state;

  beforeEach(() => {
    mutations = {
      CONTROL_MODAL: vi.fn(),
      CONTROL_ACTIVE_TAB: vi.fn(),
      SET_DELETE_NOTIFICATION: vi.fn(),
      CONTROL_CURRENT_AUTHOR: vi.fn(),
      SET_ACTIVE_FOR: vi.fn(),
    };

    state = {

      activeTab: "",
      deleteNotification: { success: "", message: "" },
      currentAuthorId: "",

    }

    store = new Vuex.Store({
      mutations,
      state,
    });
  });

  it("author and date component renders prop data correctly", async () => {
    const wrapper = mount(authorComponent, {
      propsData: {
        id: 1,
        name: "Edgaras",
        created: "1802-02-23",
        updated: "2023-02-23",
      },
    });

    const name = wrapper.find("h2").text();
    expect(name).toBe("Edgaras");

    const dateText = wrapper.find("span").text();
    expect(dateText).toBe("Updated Date: 2023-02-23");
  });

  it("component mutations works correctly", async () => {
    const wrapper = shallowMount(authorComponent, {
      localVue,
      store,
      propsData: {
        id: 1,
        name: "Edgaras",
        created: "1802-02-23",
        updated: "2023-02-23",
      },
    });

    wrapper.vm.openModal();
    wrapper.vm.activateDeleteNotification();

    expect(mutations.SET_ACTIVE_FOR).toHaveBeenCalled();
    expect(mutations.CONTROL_MODAL).toHaveBeenCalled();
    expect(mutations.CONTROL_ACTIVE_TAB).toBeCalledWith(state, "EditAuthor");
    expect(mutations.SET_DELETE_NOTIFICATION).toBeCalledWith(state, {success: "", message: ""});
    expect(mutations.CONTROL_CURRENT_AUTHOR).toBeCalledWith(state, 1);


  });
});
