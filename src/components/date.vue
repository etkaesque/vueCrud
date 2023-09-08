<template>
  <div class="date">
    <span v-if="new Date(created) > new Date(updated)">
      Created Date: {{ created }}
    </span>
    <span v-else-if="new Date(created) < new Date(updated)">
      Updated Date: {{ updated }}
    </span>
    <span v-else="new Date(created) == new Date(updated)">
      Created Date: {{ created }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    created: {
      type: String,
      required: true,
    },
    updated: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
