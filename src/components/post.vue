<template>
  <div class="article">
    <router-link :to="`post/${post.id}`" class="post">
      <article>
        <div class="content">
          <h3 class="postTitle">{{ post.title }}</h3>
          <p class="author-name">Written by: {{ post.author.name }}</p>
        </div>
        <DateComponent
          :created="post.created_at"
          :updated="post.updated_at"
        ></DateComponent>
      </article>
    </router-link>

    <div class="postInteraction">
      <button @click="activateDeleteNotification">Delete</button>
      <button @click="openModal">Edit</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import DateComponent from "./date.vue";

export default {
  props: ["post"],
  components: {
    DateComponent,
  },
  methods: {
    ...mapMutations([
      "CONTROL_MODAL",
      "CONTROL_ACTIVE_TAB",
      "CONTROL_ACTIVE_POST",
      "CONTROL_DELETE_NOTIFICATION",
      "SET_ACTIVE_FOR",
    ]),
    openModal() {
      this.CONTROL_ACTIVE_POST(this.post.id);
      this.CONTROL_ACTIVE_TAB("Edit");
      this.CONTROL_MODAL();
    },
    activateDeleteNotification() {
      this.SET_ACTIVE_FOR("Post");
      this.CONTROL_ACTIVE_POST(this.post.id);
      this.CONTROL_DELETE_NOTIFICATION();
    },
  },
};
</script>

<style scoped>
.post {
  text-decoration: none;
  color: black;
}

.article {
  overflow: hidden;
  max-width: 200px;
  height: 250px;
  border: 0.5px solid;
  padding: 10px;
  box-shadow: 2px 2px 2px black;
  text-decoration: none;
}

.article:hover {
  background-color: rgba(153, 205, 50, 0.3);
}
.postInteraction {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: end;
}

.content {
  display: flex;
  flex-direction: column;
}

button {
  width: 80px;
  height: 50px;
  margin: 0px;
}

.postTitle {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>