# 2019 3月 基于GULP构建的DEMO 


**项目运行**
```javascript
$ npm install -g gulp
$ npm install
$ npm run dev //用于开发环境
$ npm run build //用于生产环境

dev和 build都会生成dist文件夹 最后我们交付后台的是这个dist文件夹
```
浏览器输入地址查看模板：http://localhost:8888/

### 功能
1. 热刷新
2. HTML include文件
3. 图片压缩
4. 精灵图自动合并
5. SASS转为合并压缩并转为CSS

### 开发注意点

!!! 提交后端前 所有静态资源相对路径改为asserts.xcarimg.com/.....绝对路径地址
构建到测试环境 本地绑定HOST

1. 所有CSS只要在src/css/scss下建立就行了（注意建成scss文件），
所有JS 只要在src/js/下建立就行了
文件随便建，最后都会合并到一个main.css/main.js中，
此文件已经在index.html中引入了
`所有JS插件（比如JQ）请放入src/js/libs文件夹这里边的JS不会打包进入main.js`

2. 公共模块都放入components文件中，在任意页面使用include引入components的公共文件

3. 关于切下来的小图标要合成精灵图，只需将小图标放入img/sprite文件夹内就好
dev/build后 会在 dist/img/sprite/ 生成精灵图 和 对应的 sprite.css
需要查看小图标具体样式 可打开sprite.css查看class类名，直接使用就可以了

!! 注意 关于2X图 因为MAC高清本看一倍图会发虚
所以如果要合并精灵图 请把1X、2X图 分别 放入src/img/sprite  src/img/sprite2x
页面中写class  `<span class="icon-lsj2x icon-lsj">`
将2倍图的CALSS放前边  1倍图放后边




### 待处理

JS不建议合并压缩，不方便今后线上定位问题


### 和后端联调 
需要绑定HOST：127.0.0.1 asserts.xcarimg.com 127.0.0.1 dev1.xccar.com.cn
下载NGINX包 配置如下
```
 ### 为了指定asserts.xcar.com到本地，之后给后端的路径就不用变了 需要指定HOST  127.0.0.1 asserts.xcarimg.com
    server {
        listen       80;
        server_name  asserts.xcarimg.com;
        root   "D:/work/";
        location / {
            index  index.html index.htm index.php;
            if (!-e $request_filename){
                rewrite ^/(.*) /index.php last;
            }
            #autoindex  on;
        }
    }
    
    ###转发域名到dev1.xcar.com.cn 后端存COOKIE为了取COOKIE  需要指定HOST 127.0.0.1 dev1.xccar.com.cn 保证在相同域名下
     server {
        listen       80;
        server_name  dev1.xcar.com.cn;
        root   "D:/work/resource/index2019/dist/html/index/";
        location / {
            index  index.html index.htm index.php;
            if (!-e $request_filename){
                rewrite ^/(.*) /index.php last;
            }
            #autoindex  on;
        }
    }
```




### 项目目录结构
```
.
├─ build/               # gulp 任务配置目录
├─ dist/                # 构建后生成的的项目
├─ src/                 # 源码目录（开发都在这里进行）
│   ├── components/     # 组件（COMPONENT）
│   ├── html/           # 页面级html
│   ├── css/            # css文件存放目录（less ,scss,css）
│   ├── js/             # js文件存放目录
│   ├── images/         # 图片文件
├── .babelrc            # Babel 转码配置
├── .gitignore          # （配置）需被 Git 忽略的文件（夹）
├── gulpfile.js         #   gulpfile基础配置文件
├── package.json        # （这个就不用多解释了吧）
```


### IE低版本兼容小贴士
#### IE浏览器hack
html:
```html
<!--[if IE]>
这段文字只在IE浏览器显示
<![endif]-->

只在IE6下生效
<!--[if IE 6]>
这段文字只在IE6浏览器显示
<![endif]-->

只在IE6以上版本生效
<!--[if gte IE 6]>
这段文字只在IE6以上(包括)版本IE浏览器显示
<![endif]-->

只在IE8上不生效
<!--[if ! IE 8]>
这段文字在非IE8浏览器显示
<![endif]-->

非IE浏览器生效
<!--[if !IE]>
这段文字只在非IE浏览器显示
<![endif]-->
```
css:
```css
“-″减号是IE6专有的hack
“\9″ IE6/IE7/IE8/IE9/IE10都生效
“\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
“\9\0″ 只对IE9/IE10生效，是IE9/10的hack
.hack{
/*demo1 注意顺序，否则IE6/7下可能无法正确显示，导致结果显示为白色背景*/
    background-color:red; /* All browsers */
    background-color:blue !important;/* All browsers but IE6 */
    *background-color:black; /* IE6, IE7 */
    +background-color:yellow;/* IE6, IE7*/
    background-color:gray\9; /* IE6, IE7, IE8, IE9, IE10 */
    background-color:purple\0; /* IE8, IE9, IE10 */
    background-color:orange\9\0;/*IE9, IE10*/
    _background-color:green; /* Only works in IE6 */
    *+background-color:pink; /*  WARNING: Only works in IE7 ? Is it right? */
}
```
#### 1、IE8及以下，布局问题
不使用flex，box-size:border-box，calc

#### 2、ie下进行跨域请求解决方案
引入jquery.xdomainrequest.min.js

#### 3、ie8,9 进行跨域post请求，参数无法传递解决办法
jquery的ajax方法添加
crossDomain: true == !(document.all)
例如：
```javascript
$.ajax({
    url: url,
    type: 'POST',
    data: params,
    dataType: 'json',
    contentType: "application/json",
    crossDomain: true == !(document.all),
    success: function (res) {
      ...
    },
    error: function (err) {
      ...
    }
})
```

#### 4、IE6,IE7下overflow：hidden无效
解决办法：position:relative; 或者 *position:relative; /* for IE6,IE7 */ 即可解决该bug。<br/>
既：
```css
position: relative;
overflow: hidden;
```

#### 5、css3选择器兼容问题？
```html
<!- -[if (gte IE 6)&(lte IE 8)]>
<script type="text/javascript" src="./js/common/nwmatcher.js"></script>
<script type="text/javascript" src="./js/common/selectivizr-min.js"></script>
<![endif]- ->
```
在非必不可得到情况下不建议使用，会引起页面卡顿

#### 6、兼容IE8不直接使用sessionStorage,localStorage
使用公用方法，使用办法如下：
```javascript
function setKeyItem(key,value) {
    if (window.sessionStorage){
      sessionStorage.setItem(key,value);
    }else{
      setCookie(key,value,TimeoutCookie)
    }
}
```

#### 7、“JSON”未定义
引入json2.js<br/>
注：本模板已经引入<br/>
下载地址：https://github.com/douglascrockford/JSON-js

#### 8、IE跨域下出现{"readyState":0,"status":0,"TypeError"...}
对浏览器进行设置 工具->Internet选项->安全->自定义级别->其他->通过域访问数据源->启用

#### 9、透明度兼容性：
a、使用rgba背景色做透明的：<br/>
背景色变成：background: #000 \9;<br/>
再加IE9及以下的透明度设置方法<br/>
```css
opacity=80
-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
```
b、直接使用opacity设置透明度的<br/>
添加IE9及以下的透明度设置方法<br/>
```css
opacity=80
-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
```

#### 10、输入框垂直居中问题
将line-height设置成和height一样 即可,如：
```css
innput.txt{
  height: 36px;
  line-height: 36px;
}
```

#### 11、布局错位问题:
a、没有清除浮动的清除浮动即可,如：<br/>
html:
```javascript
<div class="parent clear">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
```
css:
```css
.clear{
  overflow: hidden;
  *zoom:1;
}
.parent .child{
  float: left;
}
```

#### 12、css伪类问题：
将用伪类实现的效果换成其他实现方式；<br/>
主要是针对IE7内核，如果不用兼容IE7内核，则不用处理此类问题。

#### 13、ul元素中li 两端顶头，间距均等问题
li使用float为left，加上margin-left,
然后ul同时也加上margin-left，其值使用与li相对应的负值,如：<br/>
html:
```javascript
<ul class="parent">
  <li class="child">测试</li>
  <li class="child">测试</li>
  <li class="child">测试</li>
  <li class="child">测试</li>
</ul>
```
css:
```css
.parent{
  width 1200px;
  margin-left: -20px;
  *zoom:1;
}
.parent .child{
  width 280px;
  height:400px;
  margin-left: 20px;
}
```

#### 14、background-size: cover
如果你想使用background-size: cover设置全屏背景， <br/>
很遗憾IE8办不到...但可以使用IE独有的AlphaImageLoader滤镜来实现，添加一条如下的CSS样式： <br/>
```css
.box{
   background-size: cover;
   filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale , src='image.img')\9;
}
```
将sizingMethod设置为scale，src设置成背景图片地址就OK了。<br/>
还没完，如果你在此背景之上放置了链接，那这个链接是无法点击的。<br/>
一般情况下的解决办法是为链接或按钮添加position:relative使其相对浮动。

#### 15、last-child
first-child是CSS2的内容，但是last-child就不是了，所以IE8不买账。<br/>
推荐的做法不是使用last-child，而是给最后一个元素设置一个.last的class，然后对此进行样式设置，这样就全部兼容了。

#### 16、Media Query(媒体查询)
IE8似乎无法识别Media Query，所以需要hack一下啦！推荐采用Respond.js解决此问题。<br/>
Respond.js让IE6-8支持CSS3 Media Query。<br/>
Bootstrap里面就引入了这个js文件，从名字看出来是自适应的兼容。<br/>
使用：考虑到IE9是支持CSS3的，所以直接在HTML页面的head标签中添加脚本引用即可：
```html
<!--[if lt IE 9]>
  <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]—>
```
官方demo地址：http://scottjehl.github.com/Respond/test/test.html

a.在css中正常用 min/max-width media <br/>
b.引入respond.min.js，但要在css的后面 <br/>
（越早引入越好，在ie下面看到页面闪屏的概率就越低，因为最初css会先渲染出来，如果respond.js加载得很后面，这时重新根据media query解析出来的css会再改变一次页面的布局等，所以看起来有闪屏的现象）

#### 17、关于max-width
a. td中的max-width <br/>
如果针对td中的img元素设置max-width: 100%，在IE和Firefox你会发现不奏效，而在Chrome中却是可以的。<br/>
经查询发现需要给table设置table-layout: fixed.

b. 嵌套标签中的max-width <br/>
如下的HTML结构：
```html
<div class="work-item">
  <a href="#" class="work-link">
    <img src="sample.jpg" class="work-image img-responsive">
  </a>
</div>
```
最外层元素.work-item设置了固定宽度，但是对img设置max-width为100%却无效.<br/>
后来才发现需要再对a标签设置width: 100%，这样才能使最内层的img标签充满整个div。

#### 18、嵌套inline-block下padding元素重叠
html:
```html
    <ul>
       <li><a>1</a></li>
       <li><a>2</a></li>
       <li><a>3</a></li>
    </ul>
```
CSS：
```css
    ul li{
       display: inline-block;
    }
    ul li a{
       display: inline-block;
       padding: 10px 15px;
    }
```
按理来说a标签之间的距离应该是30px，但在IE8中出现了重叠，只有15px。<br/>
我的解决方法是使用float: left替代display: inline-block实现水平布局。

#### 19、filter blur
CSS3中提供支持滤镜效果的属性filter，比如支持高斯模糊效果：<br/>
```css
filter: blur(10px);
-webkit-filter: blur(10px);
-moz-filter: blur(10px);
```
IE8对filter: blur(10px)的显示效果是对HTML元素进行小范围的模糊处理，这个效果并不是高斯模糊<br/>
要想支持高斯模糊，需要如下设置：<br/>
```css
filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10');
```
在实践中发现一个坑就是，所有position: relative的元素都不会生效。<br/>
其他的发现是，IE9对filter: blur(10px)无效，<br/>
而对filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10'),是针对元素小范围的模糊效果。

   ### <a name="reference">&sect; 参考</a>
* [npmjs](https://www.npmjs.com/)
* [gulpjs](http://www.gulpjs.com.cn/)
* [babel](https://babeljs.cn/)





