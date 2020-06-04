# Shark (A HTML5 Game Engine)

A HTML5 Game Engine to improve development proficiency based on [Pixijs](https://github.com/pixijs/pixi.js).

### [Demo](http://www.chixu.info/sharkdemo/)
### [Demo source code](https://github.com/chixu/shark-demo)
### structure
    .
    ├── ...
    ├── bin                     # compiled
    │   ├── debug               # dev
    │       ├── html5           # h5 version
    │       ├── wx              # wechat minigame version
    │       ├── ...             # others
    │   ├── release             # publish（same as debug but files will be compressed）
    │       ├── ...             # 
    ├── engine                  # engine
    │   ├── gulp                # gulp commands
    │   ├── lib                 # lib
    │   ├── src                 # engine src
    │   ├── ...                 
    ├── layout                  # layout
    ├── src                     # project src
    │   ├── app.ts              # bootstrap
    │   ├── ...                 # 
    └── gulpfile.js             
    └── package.json                      
    └── tsconfig.json                   

### command
```
gulp serve              # setup development environment in localhost
gulp build              # build
gulp publish            # publish（js and images will be compressed）
```
## Features

### create DisplayObject ###
The engine will create DisplayObject like css style to avoid too many codes on object properties.
>Tranditional way to create object
```ts
let cat = new Image('cat.png');
cat.x = 200;
cat.y = 200;
cat.scale.set(0.6, 0.6);
```
>create object in Shark Engine
```ts
let cat = shark.factory.create(Image, "src:cat;scale:0.6;y:200;x:200");
```

### Layout ###
Extract all the object creations into a simple layout xml file like html.

In order to change layout, we only need to modify the layout file.

Changes will be watched from gulp, and will be reflected on the browser immediately.

>The following code will add a bg image to stage.  
>add a cat image on the bg  
>add two eyes in cat image，the coordinates are (50,50) and (-50,50) respectively.  
```xml
<scene>
    <image data="src:cat;scale:0.6;y:200;x:200">
        <image data="src:cateye;y:50;x:-50">
        <image data="src:cateye;y:50;x:50">
    </image>
    <image data="src:bg">
</scene>
```

### Multi-layout ###
Different layouts can be implemented under different environments. 

We can have different layouts but same game logic for Web and mobile.

We can even have different layouts for `portrait` and `landscape` orientation, by adding -p(portrait)|-l(landscape) to object attributes in layout 

>The follwing code will create a image  
>the image will have scale=0.8, y=300 in `portrait`
>but scale=0.6, y=200 in `landscape`
```xml
<image data="src:cat;scale-l:0.6;scale-p:0.8;y-p:300;y-l:200;x:200">
```

### Multi-language ###
The engine will detect the language environment by querystring and navigator, and then load the respective translation file.
e.g.
#### cn.json ####
```json
{
	"gamestart": "按任意键继续",
	"gameover": "游戏结束"
}
```
#### en.json ####
```json
{
	"gamestart": "Press any key to start",
	"gameover": "Game over"
}
```
 
>the label will show `按任意键继续` in Chinese environment or "Press any key to start" in Englisth environment
```xml
<label data="value:{{gamestart}};fontSize:50;fontFamiliy:Arial;align:center"/>
```

### Image Compression
gulp-image is implemented to optimize the image size

### js Compression
uglify is implemented to optimize the js size

### [Wechat Mini Game(微信小游戏)](https://developers.weixin.qq.com) supported
The game built is compatable in Wechat Mini Game







