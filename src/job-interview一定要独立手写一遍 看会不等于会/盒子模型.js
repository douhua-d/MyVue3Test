// 首先说一下组成 ：
// content、padding、border、margin

// 标准盒子模型，是浏览器默认的盒子模型  width  就只是 content的宽度

// 从上图可以看到：
// 
// 盒子总宽度 = width + padding + border + margin;
// 
// 盒子总高度 = height + padding + border + margin
// 
// 也就是，width/height 只是内容高度，不包含 padding 和 border值
// 
// 所以上面问题中，设置width为200px，但由于存在padding，但实际上盒子的宽度有240px
// 
// box-sizing: content-box|border-box|inherit:

// 怪异模型  width = content + padding + border

// https://juejin.cn/post/7196128985612189752   各种宽度高度属性