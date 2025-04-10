<template>
  <div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
// 方法1  flex布局
//.box {
//  display: flex;
//
//  .left {
//    width: 100px;
//    background-color: #42b983;
//  }
//
//  .right {
//    flex: 1;
//    background-color: rebeccapurple;
//  }
//}


// 方法2 float + margin
.box {
 overflow:hidden;

  .left {
    float: left;
    width: 100px;
    background-color: #42b983;
  }

  .right {
    margin-left: 100px;
    background-color: darkred;
  }
}
</style>