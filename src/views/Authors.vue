<template>
    <div class="app">
      <Header :heading="heading" :isAuthors="isAuthors"></Header>
      <Main> 
         <h1>Authors</h1>
      </Main>
    </div>
  </template>
  
  <script>
  import Header from "../components/header.vue";
  
  export default {
    data(){
      return {
        heading: "Authors",
        isAuthors:true,
      }
      
    },
    components: {
      Header
    },
  };
  </script>