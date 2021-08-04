<font size=2 face="微软雅黑">

## CSS
- [CSS](#css)
  - [1、分析比较 `opacity: 0`、`visibility: hidden`、`display: none` 优劣和适用场景](#1分析比较-opacity-0visibility-hiddendisplay-none-优劣和适用场景)
  - [2、css sprite](#2css-sprite)
  - [3、`display: block` 和 `display: inline` 的区别](#3display-block-和-display-inline-的区别)
  - [4、元素水平居中](#4元素水平居中)
###  1、分析比较 `opacity: 0`、`visibility: hidden`、`display: none` 优劣和适用场景
**结构：**
1. `display: none`：会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击。
2. `visibility: hidden`：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击。
3. `opacity: 0`：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击。

**继承：**
1. `display: none`和`opacity: 0`：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
2. `visibility: hidden`：是继承属性，子孙节点消失由于继承了`hidden`，通过设置`visibility: visible`;可以让子孙节点显示。

性能：
1. `display: none` : 修改元素会造成文档回流,读屏器不会读取 `display: none` 元素内容，性能消耗较大
2. `visibility: hidden`: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取 `visibility: hidden` 元素内容
3. `opacity: 0` ：修改元素会造成重绘，性能消耗较少

### 2、css sprite
概念：将多个小图片拼接到一个图片中。通过 background-position 和元素尺寸调节需要显示的背景图案。

优点：
1. 减少 HTTP 请求数，极大地提高页面加载速度
2. 增加图片信息重复度，提高压缩比，减少图片大小
3. 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

缺点：
1. 图片合并麻烦
2. 维护麻烦，修改一个图片可能需要重新布局整个图片，样式

### 3、`display: block` 和 `display: inline` 的区别
`block` 元素特点：
1. 处于常规流中时，如果 `width` 没有设置，会自动填充满父容器 
2. 可以应用`margin/padding `
3. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4. 处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5. 忽略 `vertical-align`

`inline` 元素特点：
1. 水平方向上根据 `direction` 依次布局
2. 不会在元素前后进行换行
3. 受 `white-space` 控制
4. `margin/padding` 在竖直方向上无效，水平方向上有效
5. `width/height` 属性对非替换行内元素无效，宽度由元素内容决定
6. 非替换行内元素的行框高由 `line-height` 确定，替换行内元素的行框高由 `height`, `margin`, `padding`, `border` 决定
7. 浮动或绝对定位时会转换为 `block`
8. `vertical-align` 属性生效

### 4、元素水平居中
**1. 常规流中 inline 元素：**`text-align: center`

**2. 常规流中 block 元素**
  - 1)为元素设置宽度
  - 2)`margin:auto`

**3. 浮动元素**
- 1）为元素设置宽度
- 2）`position: relative`
- 3）浮动方向偏移量（`left` 或者 `right`）设置为 `50%`
- 4）浮动方向上的 `margin` 设置为元素宽度一半乘以`-1`

**4. 绝对定位元素**

方式一：
- 1）为元素设置宽度
- 2）`position: absolute`
- 3）偏移量(`left`或者`right`)设置为 `50%`
- 4）偏移方向外边距 `margin` 设置为元素宽度一半乘以`-1`

方式二：
- 1）为元素设置宽度
- 2）设置左右偏移量(`left`和`right`)都为 `0`
- 3）设置左右外边距 `margin` 都为 `auto`




> 来源：烟雨平生V<br>
> 链接：https://blog.csdn.net/sinat_37903468/article/details/100887223