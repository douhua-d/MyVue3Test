<script>
//https://blog.51cto.com/u_15283585/2957649
//https://www.1024sou.com/article/544995.html
/**
 * viewport 就是设备上用来显示网页的那一块区域
 * 明确三种不同的viewport视口：
 　　visual viewport 可见视口，指屏幕宽度
 　　layout viewport 布局视口，指DOM宽度
 　　ideal viewport 理想适口，使布局视口就是可见视口即为理想适口

 获取屏幕宽度(visual viewport  可见视口)：window.innerWidth;
 获取DOM宽度(layout viewport  布局视口)：document.documentElement.clientWidth;
 * */
window.innerWidth;
document.documentElement.clientWidth;

// 设置理想视口
//<meta name="viewport"content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">

//媒体查询  获取DPR监听
//-webkit-device-pixel-ratio/-webkit-max-device-pixel-ratio/-webkit-min-pixel-ratio

// js获取dpr
let dpr = window.devicePixelRatio;

</script>

<!--
对于CSS而言，可以认为是border:0.5px;，这是多倍屏下能显示的最小单位。
然而，并不是所有手机浏览器都能识别border: 0.5px，有的系统里，0.5px会被当成为0px处理，
那么如何实现这0.5px呢？网上有很多解决方法，比如border-image 图片、background-image 渐变、box-shadow 等，因为这些方案不太好，所以不做赘述了，
我推荐两种方法：用媒体查询根据dpr用“伪元素+transform”对边框进行缩放；
用JS根据屏幕尺寸和dpr精确地设置不同屏幕所应有的rem基准值和initial-scale缩放值
-->
<!-- 解决办法1  伪元素 + transform-->
<style>
.border_1px {
  position: relative;
}

.border_1px::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform-origin: 0 0;
  background-color: #000;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border_1px::before {
    transform: scale(0.5);
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border_1px::before {
    transform: scale(0.33);
  }
}
</style>

<!--解决方法2  box-shadow  box-shadow是本人最常用的，除了在Android4.4以下发现小于1p的shadow无法显示之外，其他的都是好的-->
<!--
  //下边框
  box-shadow: 0 1px #000;

  //全边框
  box-shadow: 0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000;
-->


<!--解决方法3  border-image-->
<!--
.border_1px{
          border-bottom: 1px solid #000;
        }
@media only screen and (-webkit-min-device-pixel-ratio:2){
      .border_1px{
             border-bottom: none;
             border-width: 0 0 1px 0;
             border-image: url(../img/1pxline.png) 0 0 2 0 stretch;
          }
     }
-->


<!--解决方法4  border-image-->
<!--
.border_1px{
          border-bottom: 1px solid #000;
        }
@media only screen and (-webkit-min-device-pixel-ratio:2{
　　　　.border_1px{
        　　　　background: url(../imges/1px.png) repeat-x left bottom;
       　　　　 background-size: 100% 1px;
            }
        }
-->

