<template>
  <div class="container">
    <svg width="100%" height="100%" version="1.1"
         xmlns="http://www.w3.org/2000/svg" class="svg-wrapper"
         @contextmenu="onContextMenu"
         @mousedown="onMouseDown"
         @mousemove="onMouseMove"
         @mouseup="onMouseUp"
    >

      <!--      <path :d="state.pathString" stroke="blue" stroke-width="2px" />-->

      <polygon id="polygon" :points="state.points.join(' ')" fill="none" stroke="black" />

    </svg>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';

// const curPointList = ref([]);
// const pathString = ref('M250 150 L150 350 L350 600 Z');

const state = reactive({
  isDrawing: false,
  beginPoint: null,
  pathString: 'M250 150 L150 350 L350 600 Z',
  // points: '100,50 150,50 200,100',
  points: [],
  curPointList: []
});

watch(() => state.curPointList,
    (newVal, oldVal) => {
      // console.log('监听ref数据：' + newVal, oldVal);
      state.pathString = newVal.length ? transPointToPathStr(newVal) : '';
      // console.log(state.pathString);
    },
    { deep: true });

// watch(()=> state.points)

const onMouseDown = (mouse) => {
  const { clientX, clientY, offsetX, offsetY, button } = mouse;
  console.log('onMouseDown', clientX, clientY, offsetX, offsetY);

  if (button !== 0) return;

  state.points = [];

  const point = {
    x: offsetX,
    y: offsetY
  };

  state.beginPoint = point;

  state.curPointList.push(point);

  state.points.push(offsetX + ',' + offsetY);

  state.isDrawing = true;

};

const onMouseMove = (mouse) => {
  const { clientX, clientY, offsetX, offsetY, button } = mouse;
  console.log('move', button);
  if (!state.isDrawing) return;
  const point = {
    x: offsetX,
    y: offsetY
  };
  state.curPointList.push(point);

  state.points.push(offsetX + ',' + offsetY);

};

const onMouseUp = mouse => {
  const { clientX, clientY, offsetX, offsetY, button } = mouse;
  if (button !== 0) return;

  console.log('mouse-up');
  state.isDrawing = false;
};

const transPointToPathStr = (pointList, close = false) => {
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