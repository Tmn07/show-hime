# show hime chrome extension

## intro

茉莉公主chrome插件，就是随机显示公主2D Q版形象在右上角（现已支持土豆全人物）

双击图片隐藏，按住图片移动位置，点击插件icon隐藏或展示

右键页面任意处菜单中插件按钮进入选项页面，或者右键插件icon点击选项

插件源码在src文件夹，直接拖入 chrome://extensions/ 即可，可能需要开启开发者模式。（之后也许会补充更具体的使用方式

（然后之后每一次启动chrome都会有烦人的提示，按Esc可以跳过，应该有办法处理）

现在功能性方面基本都完成了（明明这么简单却写了挺久的，太菜了...

![](2.png)



## BUG

部分页面无法加载音源与图片（如github会阻止注入


## TODO

- [ ] 触屏事件挪动
- [ ] 音效用法？
- [ ] 同步旧页面？（例如position
- [ ] 美化完善后台选项页面
- [ ] 封装/发布插件？

## 小记

写挪动相关的事件时，遇到了一个坑，img标签的mouseup事件的因为图片本身的特性，有时候无法触发。使用div标签来代替。

我这里挪动的实现，就是mousedown添加一个mousemove的监听，然后mouseup移除这个监听 我是参考[这个](https://stackoverflow.com/questions/33948464/move-an-image-with-javascript-using-mouse-events)改的

PS：chrome ext真的好难调试啊（是我太蠢了（上一个坑还没填完，这里又开始放卫星了