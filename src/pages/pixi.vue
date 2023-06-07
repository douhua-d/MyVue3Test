<template>
    <div ref="pixiEle">
        gfhgf
    </div>
</template>

<script setup>
import * as PIXI from 'pixi.js';
import { ref, onMounted, toRefs, reactive } from "vue";

const pixiEle = ref(null);
const state = reactive({
    app: "", //pixi 渲染器
    sprite: "", //sprite
    container: "",//container
    //manifest 加载到纹理缓存使用的资源 
    manifest: [
        {
            name: "delete_btn",
            url: require("@/assets/pixiImages/bg_algorithm.png")
        },
        {
            name: "rotate_btn",
            url: require("@/assets/pixiImages/bg_attendance.png")
        },
        {
            name: "scale_btn",
            url: require("@/assets/pixiImages/bg_event.png")
        },
        { name: "test0", url: require("@/assets/pixiImages/bg_intelligent_analysis.png") }
    ],
    startPoint: {
        // x,y 记录点击的x，y坐标
        x: null,
        y: null,
        // sprite x,y 初始位置 
        sprite: {
            x: null,
            y: null,
            scale: 1
        },
        // scale x,y 按钮初始位置 x2,y2 原点
        scale: { x: null, y: null, x2: null, y2: null },
        //rotate 旋转按钮 初始的位置
        rotate: { x: null, y: null },
        container: { x: null, y: null },
        deg: 0
    },
    resources: null, //资源加载

    deleteBtn: null, //删除按钮
    scaleBtn: null, //缩放按钮
    rotateBtn: null, //旋转按钮
    graphics: null //矩形框
})


// https://blog.csdn.net/weixin_44218877/article/details/122497123

// https://juejin.cn/post/6844903791431680008

onMounted(() => {
    console.log(pixiEle.value);
    this.createStickerCanvas();
})

// 创建 PIXI 渲染器 函数
function createStickerCanvas() {
    // 创建一个pixi渲染器
    this.app = new PIXI.Application({
        backgroundColor: 0x1099bb,
        // transparent: true,// 透明
        width: 750,
        height: 750
    });
    // 把pixi渲染器 放到页面page_canvas元素中
    pixiEle.value.appendChild(this.app.view);
    //加载纹理函数
    this.loadTexture();
}


//loader 加载图片资源到纹理缓存函数
function loadTexture() {
    var loader = new PIXI.loaders.Loader();
    loader.add(this.manifest);
    loader.on("progress", () => {
        console.log("加载完成");
    });
    loader.load((e) => {
        this.resources = e.resources;
        this.createPIXIImg("test0");
    });
}

// sprite container 函数
function createPIXIImg(name) {
    // 创建 container
    var container = new PIXI.Container();
    container.scale.set(1, 1);
    container.rotation = 0;
    container.name = name;
    this.container = container;
    // 创建sprite
    var sprite = new PIXI.Sprite(this.resources[name].texture);
    this.sprite = sprite;
    // 精灵设置缩放
    sprite.scale.set(1, 1);
    // sprite设置定位
    sprite.position.set(400, 400);
    // 设置锚点在中间
    sprite.anchor.set(0.5);
    // 设置有交互性
    sprite.interactive = true;
    sprite.name = name;
    //  设置sprite 点击事件
    sprite.on("pointerdown", (e) => {
        this.onDragStart(e);
    });
    sprite.on("pointerup", (e) => {
        this.onDragEnd(e);
    });
    sprite.on("pointerupoutside", (e) => {
        this.onDragEnd(e);
    });
    sprite.on("pointermove", (e) => {
        this.onDragMove(e);
    });
    // 把sprite 添加到container中
    container.addChild(sprite);
    // 把container 添加到 pixi 渲染器中
    this.app.stage.addChild(container);
    // 按钮函数
    this.createInteractiveButton();
},
</script>

<style scoped>

</style>