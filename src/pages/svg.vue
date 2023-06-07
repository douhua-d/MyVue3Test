<template>
  <div class="container">
    <svg width="100%" height="100%" version="1.1"
         xmlns="http://www.w3.org/2000/svg" class="svg-wrapper"
         @contextmenu="onContextMenu"
         @mousedown="onMouseDown"
         @mousemove="onMouseMove"
    >

      <path :d="pathString" stroke="blue" stroke-width="2px" />

    </svg>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';

const curPointList = ref([]);
const pathString = ref('M250 150 L150 350 L350 600 Z');
const state = reactive({
  isDrawing: false,
  beginPoint: null

});

watch(curPointList,
    (newVal, oldVal) => {
      console.log('监听ref数据：' + newVal, oldVal);
      pathString.value = newVal.length ? transPointToPathStr(newVal) : '';
    },
    { deep: true });

const onMouseDown = (mouse) => {
  const { clientX, clientY, offsetX, offsetY,button } = mouse;
  console.log('onMouseDown', clientX, clientY, offsetX, offsetY);
  // curPointList.value = [{ x: 100, y: 100 }, { x: 200, y: 70 }, { x: 500, y: 100 }];


};

const onMouseMove = (mouse) => {
  console.log('move', mouse.button);
};

const transPointToPathStr = (pointList, close = false) => {
  console.log({ pointList });
  // debugger
  let str = '';
  if (pointList && pointList.length > 0) {
    pointList.map((point, index) => {
      if (index === 0) {
        str += `M${point.x},${point.y}`;
      } else {
        str += `,L${point.x}, ${point.y}`;
      }
    });
    if (pointList.length > 2 && close) {
      str += 'Z';
    }
  }
  return str;
};

const onContextMenu = (e) => {
  e.preventDefault();
};


</script>

<style lang="less" scoped>
.container {
  position: relative;
  //width: 100%;
  //height: 100%;
  width: 600px;
  height: 600px;
}

.svg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>