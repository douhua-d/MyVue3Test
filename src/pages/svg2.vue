<template>
  <div>
    <!-- SVG容器 -->
    <svg
        ref="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        width="800"
        height="600"
    >
      <!-- 绘制的线条 -->
      <line v-if="isDrawingLine" :x1="startX" :y1="startY" :x2="endX" :y2="endY" stroke="black" />

      <!-- 绘制的矩形框 -->
      <rect v-if="isDrawingRect" :x="startX" :y="startY" :width="rectWidth" :height="rectHeight" fill="none" stroke="black" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawingLine: false, // 是否正在绘制线条
      isDrawingRect: false, // 是否正在绘制矩形框
      startX: 0, // 绘制起始点的x坐标
      startY: 0, // 绘制起始点的y坐标
      endX: 0, // 绘制结束点的x坐标
      endY: 0, // 绘制结束点的y坐标
      rectWidth: 0, // 矩形框的宽度
      rectHeight: 0, // 矩形框的高度
    };
  },
  methods: {
    startDrawing(event) {
      // 获取鼠标按下时的起始点坐标
      this.startX = event.offsetX;
      this.startY = event.offsetY;

      // 开始绘制线条或矩形框
      if (event.shiftKey) {
        // 按下Shift键，绘制矩形框
        this.isDrawingRect = true;
        this.rectWidth = 0;
        this.rectHeight = 0;
      } else {
        // 不按Shift键，绘制线条
        this.isDrawingLine = true;
        this.endX = this.startX;
        this.endY = this.startY;
      }
    },
    draw(event) {
      // 实时更新绘制结束点的坐标
      this.endX = event.offsetX;
      this.endY = event.offsetY;

      if (this.isDrawingRect) {
        // 计算矩形框的宽度和高度
        this.rectWidth = Math.abs(this.endX - this.startX);
        this.rectHeight = Math.abs(this.endY - this.startY);
      }
    },
    stopDrawing() {
      // 停止绘制
      this.isDrawingLine = false;
      this.isDrawingRect = false;
    },
  },
};
</script>
