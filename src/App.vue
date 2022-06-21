<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  <Test/>Q-->
  <!--  <TwoColumnsLayout />-->
  <ThreeColumnsLayout />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Test from "./components/Test";
import TwoColumnsLayout from "@/TwoColumnsLayout";
import ThreeColumnsLayout from "@/ThreeColumnsLayout";

export default {
  name: 'App',
  components: {
    TwoColumnsLayout,
    ThreeColumnsLayout
    // Test
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
