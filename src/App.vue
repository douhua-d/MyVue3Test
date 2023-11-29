<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  <Test/>Q-->
  <!--  <TwoColumnsLayout />-->
  <!--    <ThreeColumnsLayout />-->
  <!--  <AdaptionCard/>-->
  <!--  <pixi/>-->
  <!--  <Svg />-->
  <!--  <Svg2 />-->
  <!--  <Svg3 />-->
<!--  <Test />-->
  <TimePlan/>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Test from "./components/Test";
import TwoColumnsLayout from '@/TwoColumnsLayout';
import ThreeColumnsLayout from '@/ThreeColumnsLayout';
import AdaptionCard from '@/components/AdaptionCard';
// import pixi from "@/pages/pixi";
import Svg from '@/pages/svg';
import Svg2 from '@/pages/svg2';
import Svg3 from '@/pages/svg3';
import Test from '@/pages/test';
import TimePlan from '@/components/timeplan'

export default {
  name: 'App',
  components: {
    TimePlan,
    Test,
    Svg3,
    Svg2,
    Svg,
    // pixi,
    AdaptionCard,
    TwoColumnsLayout,
    ThreeColumnsLayout
    // Test
    // HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
