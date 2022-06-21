<template>
  <!--  flex 布局-->
  <div class="wrap_flex">
    <div class="left">flex - left</div>
    <div class="middle">flex - middle</div>
    <div class="right">flex - right</div>
  </div>

  <!--  grid 布局-->
  <div class="wrap_grid">
    <div class="left">grid - left</div>
    <div class="middle">grid - middle</div>
    <div class="right">grid - right</div>
  </div>

  <!--  float -->
  <div class="wrap_float">
    <div class="left">float - left</div>
    <div class="right">float - right</div>
    <div class="middle">float - middle</div>
  </div>

  <!--  absolute -->
  <div class="wrap_absolute">
    <div class="left">absolute - left</div>
    <div class="middle">absolute - middle</div>
    <div class="right">absolute - right</div>
  </div>
</template>

<script>
export default {
  name: "ThreeColumnsLayout"
}
</script>

<style lang="less" scoped>
.wrap_flex {
  display: flex;

  .left {
    width: 200px;
    background-color: black;
  }

  .middle {
    //width: 100%; // 都可以
    flex: 1;
    background-color: red;
  }

  .right {
    width: 200px;
    background-color: green;
  }
}

.wrap_grid {
  display: grid;
  grid-template-columns:200px auto 200px;

  .left {
    background-color: #2c3e50;
  }

  .right {
    background-color: rebeccapurple;
  }

  .middle {
    background-color: goldenrod;
  }
}

.wrap_float{
  overflow:hidden;
  .left{
    float: left;
    width: 200px;
    background-color: red;
  }
  .right{
    float: right;
    width: 200px;
    background-color: crimson;
  }
  .middle{
    margin: 0 200px;
    background-color: blue;
  }
}
.wrap_absolute{
  position: relative;
  .left{
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #42b983;
  }
  .right{
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: hotpink;
  }
  .middle{
    margin-left: 200px;
    margin-right: 200px;
    background-color: lightcoral;
  }
  .test{
    justify-content: center;
    align-items: center;
  }
}
</style>