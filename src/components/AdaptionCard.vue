<template>
  <div class="container">
    <div class="wrapper">
      <div class="item" v-for="item in num " :key="item">{{ item }}</div>
    </div>
    <div class="wrapper2">
      <div class="item2" v-for="item in num " :key="item">
        <div class="content">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs, reactive } from "vue";

export default {
  name: "AdaptionCard",
  setup() {
    const state = reactive({
      num: 11
    });

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
html {
  padding: 0;
}

.container {
  border: 1px solid green;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);

  .item {
    width: 100px;
    height: 100px;
    border: 1px solid rebeccapurple;
  }
}

.wrapper2 {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 10px;

  .item2 {
    width: 100px;
    height: 100px;
    border: 1px solid darkgreen;
    justify-self: center;
    .content {
      background-color: rebeccapurple;
      width: 20px;
      height: 20px;
    }
  }
}
</style>