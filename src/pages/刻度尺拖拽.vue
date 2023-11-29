<template>
  <div class="timeline" @mousedown="startDragRange" @mousemove="updateDragRange" @mouseup="stopDragRange">
    <!-- 刻度尺背景 -->
    <div class="timeline-background"></div>
    <!-- 刻度尺标记 -->
    <div class="timeline-markers">
      <div class="timeline-marker" v-for="hour in 24" :key="hour">
        <div class="marker-line" :class="{ 'long-line': hour % 4 === 0 }"></div>
      </div>
    </div>
    <!-- 区间选择条 -->
    <div class="time-range" :style="{ left: rangeStart + '%', width: rangeWidth + '%' }"></div>
    <!-- 拖拽选择区域 -->
    <div class="drag-range" :style="{ left: dragStart + '%', width: dragWidth + '%' }" v-if="isDragging"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false, // 是否正在拖拽选择区域
      dragStart: 0, // 拖拽选择的起始位置百分比
      dragWidth: 0, // 拖拽选择的宽度百分比
      rangeStart: 0, // 区间选择条的起始位置百分比
      rangeWidth: 20, // 区间选择条的宽度百分比
    };
  },
  methods: {
    startDragRange(event) {
      this.isDragging = true;
      const timeline = this.$el;
      const timelineRect = timeline.getBoundingClientRect();
      const mouseX = event.clientX - timelineRect.left;
      const timelineWidth = timeline.offsetWidth;
      const startPercent = (mouseX / timelineWidth) * 100;
      this.dragStart = Math.max(0, Math.min(100 - this.dragWidth, startPercent));
    },
    updateDragRange(event) {
      if (this.isDragging) {
        const timeline = this.$el;
        const timelineRect = timeline.getBoundingClientRect();
        const mouseX = event.clientX - timelineRect.left;
        const timelineWidth = timeline.offsetWidth;
        const endPercent = (mouseX / timelineWidth) * 100;
        this.dragWidth = Math.max(0, Math.min(100 - this.dragStart, endPercent - this.dragStart));
      }
    },
    stopDragRange() {
      if (this.isDragging) {
        this.isDragging = false;
        this.rangeStart = this.dragStart;
        this.rangeWidth = this.dragWidth;
        this.dragStart = 0;
        this.dragWidth = 0;
      }
    },
  },
};
</script>

<style>
.timeline {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.timeline-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
}

.timeline-markers {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.timeline-marker {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.marker-line {
  width: 1px;
  height: 8px;
  background-color: #666;
}

.long-line {
  height: 12px;
}

.time-range {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #007bff;
  opacity: 0.5;
  cursor: move;
}

.drag-range {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #ffcc00;
  opacity: 0.5;
  cursor: move;
}
</style>
