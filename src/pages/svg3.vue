<template>
  <div>
    <!-- SVG容器 -->
    <svg ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" width="800" height="600">
      <!-- 已绘制的多边形区域 -->
      <path :d="polygonPath" fill="lightblue" stroke="black" />
    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDrawing: false, // 是否正在绘制
      polygonPoints: [] // 多边形的顶点坐标数组
    };
  },
  computed: {
    polygonPath () {
      if (this.polygonPoints.length === 0) {
        return ''; // 如果没有顶点，返回空路径
      }

      let path = `M${this.polygonPoints[0].x} ${this.polygonPoints[0].y}`; // 起始路径

      for (let i = 1; i < this.polygonPoints.length; i++) {
        path += ` L${this.polygonPoints[i].x} ${this.polygonPoints[i].y}`; // 添加线段
      }

      path += ' Z'; // 闭合路径

      console.log({ path });
      return path;
    }
  },
  methods: {
    startDrawing (event) {
      if (!this.isDrawing) {
        // 开始绘制多边形
        this.isDrawing = true;
        this.polygonPoints = [{ x: event.offsetX, y: event.offsetY }];
      }
    },
    draw (event) {
      if (this.isDrawing) {
        if (this.polygonPoints.length > 1) {
          // 更新最后一个顶点的坐标
          const lastPoint = this.polygonPoints[this.polygonPoints.length - 1];
          lastPoint.x = event.offsetX;
          lastPoint.y = event.offsetY;
        } else {
          this.polygonPoints.push({ x: event.offsetX, y: event.offsetY });
        }
      }
    },
    stopDrawing () {
      if (this.isDrawing) {
        // 停止绘制多边形
        this.isDrawing = false;
      }
    }
  }
};
</script>
