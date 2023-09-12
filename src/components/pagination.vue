<template>
  <div>
    <div v-if="type === `Posts`">

      <div v-if="!postsArray.includes(1)" class="edge">

        <button @click="changePostPage(1)">1</button>
        <span class="dotdotdot">...</span>

      </div>

  
      <div v-for="page in postsArray">

        <button
          :class="{ selected: page === currentPage }"
          @click="changePostPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <div v-if="!postsArray.includes(lastPage)" class="edge">

      <span class="dotdotdot">...</span>
      <button @click="changePostPage(lastPage)">{{ lastPage }}</button>
    
      </div>

    </div>

    <div v-if="type === `Authors`">

      <div v-if="!authArray.includes(1)" class="edge">

      <button @click="changeAuthorPage(1)">1</button>
      <span class="dotdotdot">...</span>

      </div>

      <div v-for="page in authArray">
        <button
          :class="{ selected: page === authorCurentPage }"
          @click="changeAuthorPage(page)"
        >
          {{ page }}
        </button>
      </div>


      <div v-if="!authArray.includes(lastAuthPage)" class="edge">

      <span class="dotdotdot">...</span>
      <button @click="changeAuthorPage(lastAuthPage)">{{ lastAuthPage }}</button>

      </div>




    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    type: {
      String,
    },
  },
  computed: {
    ...mapGetters([
      "postsCount",
      "pages",
      "searchTerm",
      "authorsPages",
      "authorSearchTerm",
      "currentPage",
      "authorCurentPage",
    ]),
    lastPage() {
      return this.pages.slice(-1)[0]
    },
    lastAuthPage() {
      return this.authorsPages.slice(-1)[0]
    },
    postsArrayFirst() {
     return this.currentPage - 2;
    },
    postsArrayLast() {
      return this.currentPage + 1;
    },
    authArrayFirst() {
      return this.authorCurentPage - 2;
    },
    authArrayLast() {
      return this.authorCurentPage + 1;
    },
   
    postsArray() {
      let array = [];

      this.pages.forEach(item => {
        array.push(item)
      })

      let first = this.postsArrayFirst;
      let last = this.postsArrayLast;

      if (first < 1) {
        first = 0;
        last = last + 1
      }
      if (last > array[array.length - 2 ]) {
        last = array[array.length -1 ];
        first = first - 1
      }

      let customArray = array.slice(first, last)
      return customArray;
    },

    authArray() {

      let array = [];

      this.authorsPages.forEach(item => {
          array.push(item)
        })

      console.log(array)

      let first = this.authArrayFirst;
      let last = this.authArrayLast;

      if (first < 1) {
          first = 0;
          last = last + 1
        }
      if (last > array[array.length - 2 ]) {
          last = array[array.length -1 ];
          first = first - 1
        }

      let customArray = array.slice(first, last)
      console.log(customArray)
      return customArray;

            }


  },
  methods: {
    ...mapActions(["setPosts", "getAuthors"]),
    ...mapMutations(["SET_CURRENT_PAGE", "SET_AUTHOR_CURRENT_PAGE"]),
    async changePostPage(page) {
      this.SET_CURRENT_PAGE(page);
    
      await this.setPosts({ term: this.searchTerm, page: page });
    },
    async changeAuthorPage(page) {
      this.SET_AUTHOR_CURRENT_PAGE(page);

      await this.getAuthors({ term: this.authorSearchTerm, page: page });
    },
  },
};
</script>

<style>
.selected {
  background-color: lightblue;
}

.dotdotdot {
  display: flex;
  align-self: center;

}
</style>
