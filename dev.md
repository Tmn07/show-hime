# show hime chrome extension

## intro

茉莉公主chrome插件，就是随机显示公主2D Q版形象在右上角（现已支持土豆全人物）

双击图片隐藏，按住图片移动位置，点击插件icon隐藏或展示

右键页面任意处菜单中插件按钮进入选项页面，或者右键插件icon点击选项

插件源码在src文件夹，直接拖入 chrome://extensions/ 即可，可能需要开启开发者模式。（之后也许会补充更具体的使用方式

（然后之后每一次启动chrome都会有烦人的提示，按Esc可以跳过，应该有办法处理）

现在功能性方面基本都完成了（明明这么简单却写了挺久的，太菜了...

## 目录结构

|- src 源代码
|- img_spider 图片爬虫代码
|  |- main.py 2d Q版人物爬虫
|  |- 3dimg.py 3d人物爬虫
|- chrome 审核相关的资料
|- img readme相关图片

## 图片命名规则

00	39人MTG服装
01	BNT 海外服装
0	BNT
1	UNION
2	Flyers
3	GlowMaps
4	Harmony4You
10	拉面
11	罗森
12	东急?
13	1周年公开煤炉联动素材。未处理
22	TOP
gif	2nd彩蛋

## TODO
- [ ] 点击出popup页面（隐藏，选项，一键ho教）
- [ ] 选项页面优化
- [ ] 同步旧页面？（例如position

## 小记

2019/05/14版本，增加的触屏事件，封装隐藏了console.log，追加偶像图片。

2019/06/17版本，追加偶像图片，屏蔽github.com。

写挪动相关的事件时，遇到了一个坑，img标签的mouseup事件的因为图片本身的特性，有时候无法触发。使用div标签来代替。

我这里挪动的实现，就是mousedown添加一个mousemove的监听，然后mouseup移除这个监听 我是参考[这个](https://stackoverflow.com/questions/33948464/move-an-image-with-javascript-using-mouse-events)改的

PS：chrome ext真的好难调试啊（是我太蠢了（上一个坑还没填完，这里又开始放卫星了

.
.
.
.
.

2019/09/04版本，支持多语言
2019/10/24版本，支持https
2019/10/28版本，从插件内部加载图片，解决一堆问题...