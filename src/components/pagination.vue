<template>
  <div class="pagWrap">
    <div v-if="dinamicArray.length != 0" class="pags">
      <div v-if="!dinamicArray.includes(1)" class="edge">
        <button @click="changePage(1)">1</button>
        <span class="dotdotdot">...</span>
      </div>

      <div v-for="page in dinamicArray">
        <button
          :class="{ selected: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>

      <div v-if="!dinamicArray.includes(lastPage)" class="edge">
        <span class="dotdotdot">...</span>
        <button @click="changePage(lastPage)">
          {{ lastPage }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    type: {
      String,
    },
    fullArray: {
      Object,
    },
    currentPage: {
      Number,
    },
  },
  computed: {
    ...mapGetters([
      "postsCount",
      "pages",
      "searchTerm",
      "authorsPages",
      "authorSearchTerm",
    ]),
    lastPage() {
      return this.fullArray.slice(-1)[0];
    },
    arrayFirst() {
      return this.currentPage - 2;
    },
    arrayLast() {
      return this.currentPage + 1;
    },
    dinamicArray() {
      if (this.fullArray.length < 6) {
        return this.fullArray;
      } else {
        let array = [];
        this.fullArray.forEach((item) => {
          array.push(item);
        });

        let first = this.arrayFirst;
        let last = this.arrayLast;

        if (first < 1) {
          first = 0;
          last = last + 1;
        }
        if (last > array[array.length - 2]) {
          last = array[array.length - 1];
          first = first - 1;
        }

        let customArray = array.slice(first, last);

        return customArray;
      }
    },
  },
  emits: ["changePage"],
  methods: {
    async changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style>
.selected {
  background-color: lightblue;
}

.edge {
  display: flex;
}

.dotdotdot {
  display: flex;
  align-self: center;
  width: 100%;
  height: 100%;
}

.pagWrap {
  width: 100%;
}

.pags {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
