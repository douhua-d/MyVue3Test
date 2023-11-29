<template>
    <div class="timeplan">
        <div class="time-line" :style="computedTimeLabelOffsetStyle">
            <span v-for="(item, index) in TIME_LABEL" :key="index" :style="computedTimeLabelStyle">
                {{ item }}
            </span>
        </div>
        <div class="week-wrapper">
            <div class="week-line">
                <span
                    v-for="(item, index) in WEEKDAY_LABEL"
                    :key="index"
                    class="week-item"
                    :style="computedWeekLabelStyle"
                >
                    {{ item }}
                </span>
            </div>
            <div class="time-content">
                <span class="hour-cell" v-for="(item, index) in TOTAL_HOURSE" :key="'hourcell' + index"></span>
                <span
                    class="time-blocks"
                    v-for="(item, index) in activeBlocks"
                    :key="'timeblock' + index"
                    :style="getActiveBlockStyle(item)"
                ></span>
                <span class="current-block" :style="computedCurrentBlock" ref="currentBlock" />
                <div
                    class="time-cover"
                    @mousedown="onMouseDown"
                    @mousemove="onMouseMove"
                    @mouseup="onMouseUp"
                    ref="timeCover"
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import { TIME_LABEL, WEEKDAY_LABEL } from './timeplan-config';
const TOTAL_HOURSE = 24 * 7;
export default {
    data() {
        return {
            isMoving: false,
            activeBlocks: [],
            boxWidth: 0,
            boxHeight: 0,
            singleWidth: 0,
            singleHeight: 0,
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 0, y: 0 },
            currentBlock: {
                left: 0,
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                isEdit: false,
                currentLeft: 0,
                currentWidth: 0
            }
        };
    },
    computed: {
        computedCurrentBlock() {
            const { left, top, width } = this.currentBlock;
            return {
                left: left + 'px',
                top: top + 'px',
                width: width + 'px',
                height: this.singleHeight + 'px'
            };
        },
        computedWeekLabelStyle() {
            return {
                height: this.singleHeight + 'px',
                lineHeight: this.singleHeight + 'px'
            };
        },
        computedTimeLabelStyle() {
            return {
                width: this.singleWidth * 2 + 'px'
            };
        },
        computedTimeLabelOffsetStyle() {
            return {
                marginLeft: -this.singleWidth + 'px'
            };
        }
    },
    created() {
        this.TIME_LABEL = TIME_LABEL;
        this.WEEKDAY_LABEL = WEEKDAY_LABEL;
        this.TOTAL_HOURSE = TOTAL_HOURSE;
    },
    mounted() {
        this.boxWidth = this.$refs.timeCover.offsetWidth;
        this.boxHeight = this.$refs.timeCover.offsetHeight;
        this.singleHeight = this.boxHeight / 7;
        this.singleWidth = this.boxWidth / 24;
    },
    methods: {
        onMouseDown(e) {
            const editBlock = this.findActivePoint({ x: e.offsetX, y: e.offsetY });
            this.isMoving = true;
            this.startPoint = {
                x: e.offsetX,
                y: e.offsetY
            };
            this.currentBlock.height = this.singleHeight;
            // 存在即编辑
            if (editBlock) {
              console.log("已存在是编辑");
                this.currentBlock = editBlock;
                this.currentBlock.currentLeft = parseFloat(editBlock.left);
                this.currentBlock.currentWidth = parseFloat(editBlock.width);
            } else {
              console.log("不是编辑");
                this.currentBlock.left = e.offsetX;
                this.currentBlock.isEdit = false;
                // 自对齐，当前所在位置的top
                const realTop = Math.floor(e.offsetY / this.singleWidth);
                this.currentBlock.top = realTop * this.singleWidth;
            }
        },
        onMouseMove(e) {
            if (!this.isMoving) return;

            // 检查是否超出边界
            if (e.offsetX < 0 || e.offsetX > this.boxWidth || e.offsetY < 0 || e.offsetY > this.boxHeight) {
                return;
            }

          console.log("是否交叉",this.checkIsCross({ x: e.offsetX, y: e.offsetY }));
            if (this.checkIsCross({ x: e.offsetX, y: e.offsetY })) return;
          console.log("this.currentBlock.isEdit--left right 或 false" ,this.currentBlock.isEdit);
            if (this.currentBlock.isEdit) {
                // 编辑前半部分还是后半部分
                if (this.currentBlock.isEdit === 'left') {
                    // 右移
                    if (e.offsetX > this.currentBlock.currentLeft) {
                        const w = this.currentBlock.currentWidth - (e.offsetX - this.currentBlock.currentLeft);
                        this.currentBlock.left = e.offsetX;
                        this.currentBlock.width = w;
                        // 左移
                    } else {
                        const w = this.currentBlock.currentLeft - e.offsetX + this.currentBlock.currentWidth;
                        this.currentBlock.left = e.offsetX;
                        this.currentBlock.width = w;
                    }
                } else {
                    // 右移
                    const rightLocation = this.currentBlock.currentLeft + this.currentBlock.currentWidth;
                    if (e.offsetX > rightLocation) {
                        const w = this.currentBlock.currentWidth + e.offsetX - rightLocation;
                        this.currentBlock.width = w;
                        // 左移
                    } else {
                        const w = this.currentBlock.currentWidth - (rightLocation - e.offsetX);
                        this.currentBlock.width = w;
                    }
                }
            } else {
                // 右移
                if (e.offsetX > this.startPoint.x) {
                  console.log("不是编辑--右移");
                    const w = e.offsetX - this.startPoint.x;
                    this.currentBlock.width = w;
                    // 左移
                } else {
                  console.log("不是编辑--左移");
                    const w = this.startPoint.x - e.offsetX;
                    this.currentBlock.left = e.offsetX;
                    this.currentBlock.width = w;
                }
            }

            // 限制时间片段宽度和位置
            if (this.currentBlock.left < 0) {
                this.currentBlock.left = 0;
            }
            if (this.currentBlock.left + this.currentBlock.width > this.boxWidth) {
                this.currentBlock.width = this.boxWidth - this.currentBlock.left;
            }
        },
        onMouseUp(e) {
            // 检查是否超出边界
            if (e.offsetX < 0 || e.offsetX > this.boxWidth || e.offsetY < 0 || e.offsetY > this.boxHeight) {
                this.isMoving = false;
                this.resetCurrentBlock();
                return;
            }

            this.isMoving = false;
            this.activeBlocks.push(this.currentBlock);
            this.resetCurrentBlock();
        },
        resetCurrentBlock() {
            this.currentBlock = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                isEdit: false,
                currentLeft: 0,
                currentWidth: 0
            };
        },
        getActiveBlockStyle(obj) {
            const { left, top, width } = obj;
            return {
                left: left + 'px',
                top: top + 'px',
                width: width + 'px',
                height: this.singleHeight + 'px'
            };
        },
        // 限制
        checkLimit(point) {
            if (point.y > this.currentBlock.top + this.currentBlock.height) {
                return false;
            } else if (point.y < this.currentBlock.top) {
                return false;
            } else {
                return true;
            }
        },
        //是否交叉
        checkIsCross(point) {
            const p = this.findPointCurrentLine(point);
            if (p) {
                if (p === this.currentBlock) {
                  console.log(1);
                    return false;
                } else {
                    // 自动贴合，避免快速拖动时步长过高导致无法连接
                    this.autoFix(p);
                  console.log(2);
                    return true;
                }
            } else {
              console.log(3);
                return false;
            }
        },
        // 自动贴合
        autoFix(point) {
            // 贴合前部
            if (point.left < this.currentBlock.left) {
              console.log("贴合1");
                this.currentBlock.width = this.currentBlock.left - (point.left + point.width) + this.currentBlock.width;
                this.currentBlock.left = point.left + point.width;
            } else {
              console.log("贴合2");
                this.currentBlock.width = point.left - this.currentBlock.left;
            }
        },
        // 查找点仅限当前行
        findPointCurrentLine(point) {
            const { x, y } = point;
            const pointTop = Math.floor(y / this.singleHeight) * this.singleHeight;
            const newArr = this.activeBlocks.filter(item => item.top === pointTop);
          // console.log("this.activeBlocks",this.activeBlocks);
          
            for (let i = 0; i < newArr.length; i++) {
                // 检测
                const activeLeft = parseFloat(newArr[i].left);
                const activeTop = parseFloat(newArr[i].top);
                const activeWidth = parseFloat(newArr[i].width);

                if (x >= activeLeft && x <= activeLeft + activeWidth) {
                    if (y >= activeTop && y <= activeTop + this.singleHeight) {
                        return newArr[i];
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }
        },
        // 查找点
        findActivePoint(point) {
            const { x, y } = point;
            for (let i = 0; i < this.activeBlocks.length; i++) {
                // 检测
                const activeLeft = parseFloat(this.activeBlocks[i].left);
                const activeTop = parseFloat(this.activeBlocks[i].top);
                const activeWidth = parseFloat(this.activeBlocks[i].width);

                if (x >= activeLeft && x <= activeLeft + activeWidth) {
                    if (y >= activeTop && y <= activeTop + this.singleHeight) {
                        let direction = '';
                        if (x < (activeLeft + activeWidth + activeLeft) / 2) {
                            direction = 'left';
                        } else {
                            direction = 'right';
                        }
                        this.activeBlocks[i].isEdit = direction;
                        return this.activeBlocks[i];
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.timeplan {
    .time-line {
        display: flex;
        padding-left: calc(4em + 16px);
        > span {
            display: block;
            text-align: center;
        }
    }
    .week-wrapper {
        display: flex;
        .week-line {
            width: 4em;
            .week-item {
                display: block;
            }
        }
        .time-content {
            position: relative;
            display: grid;
            grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
            grid-template-rows: auto auto auto auto auto auto auto;
            margin-left: 16px;
            .hour-cell {
                display: block;
                width: 34px;
                height: 34px;
                border: 1px solid #ddd;
            }
            .time-cover {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
            }
            .time-blocks {
                position: absolute;
                background-color: purple;
            }
            .current-block {
                position: absolute;
                background-color: cadetblue;
            }
        }
    }
}
</style>
