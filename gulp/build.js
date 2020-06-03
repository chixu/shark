const gulp = require("gulp");
// const fsp = require('fs-promise');
const fs = require("fs");
const webpack = require("webpack");
const path = require('path');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
// const UglifyJS = require("uglify-js");
let isPublish = false;
let platform = 'html5';
let timeStamp;
const files = {
    html: ['index.html'],
    scripts: ['src/main.js', 'src/admin.js'],
    scriptsCompile: ['src/hyupload.js'],
    allscripts: ['src/**/*.js', 'src/lib/**/*.js'],
    allBuildScripts: ['lib/pixi.min.js', 'js/app.js'],
    php: ['src/**/*.php'],
    images: ['python/*.png'],
    srcPath: "../../src",
    binPath: "../../bin",
    wechatPath: "../../../../mpweixin/minigame/js",
}


function getTimeStamp() {
    if (!timeStamp)
        timeStamp = Date.now();
    return timeStamp;
}

function getSrcs(arr) {
    return arr.map(v => path.join(__dirname, files.srcPath, v));
}

function getDistPath() {
    let p = isPublish ? 'release' : 'debug';
    return path.join(__dirname, files.binPath, p, platform);
}

function build() {
    console.log(__dirname);

    let p = isPublish ? 'release' : 'debug';
    let entry = 'app.ts';
    if (platform === "wx") {
        entry = 'app.wx.ts';
        // output = 'app.wx.js';
    }
    console.log("entry", entry);
    let config = {
        mode: 'development',
        // devtool: 'inline-source-map',
        entry: path.resolve(__dirname, "../../src", entry),
        output: {
            filename: "app.js",
            path: path.resolve(__dirname, '../../bin', p, platform, 'js')
        },
        // resolve: {
        //   extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        // },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            // loaders: [{
            //   test: /\.tsx?$/,
            //   loader: "ts-loader"
            // }]
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]
        }
    };
    if (!isPublish) {
        config.devtool = 'inline-source-map';
    }
    return new Promise(resolve => {
        webpack(config, (err, stats) => {
            if (err) console.log('Webpack', err)

            console.log(stats.toString({ /* stats options */ }))

            resolve();
        });
    });
}

function publish2() {
    isPublish = true;
    return Promise.resolve();
}

function configWx() {
    platform = 'wx';
    return Promise.resolve();
}

function configHtml5() {
    platform = 'html5';
    return Promise.resolve();
}

gulp.task("uglify", cb => {
    return build(true);
});

function minifyJS() {
    let distPath = getDistPath();
    // let srcs = files.allBuildScripts.map(v => path.join(distPath, v));
    return gulp.src(path.join(distPath, 'js/all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(path.join(distPath, 'js/babel')))
}

function html() {
    return gulp.src(getSrcs(files.html))
        .pipe(gulp.dest(getDistPath()))
}

function htmlPublish() {
    let time = new Date().getTime()
    return gulp.src(getSrcs(files.html))
        //     .pipe(replace('{{{publishtime}}}', time))
        //     .pipe(replace('{{{publishscript}}}', `
        //   <script type="text/javascript">
        //       window.___publish = true;
        //       window.___publishtime = ${time};
        //   </script>`))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(getDistPath()))
}

function wechat() {
    let distPath = getDistPath();
    // let srcs = files.allBuildScripts.map(v => path.join(distPath, v));
    let f = fs.readFileSync(path.join(distPath, 'js/app.js'), "utf-8");
    f = "import * as PIXI from './libs/pixi.min'; \n" + f;
    fs.writeFileSync(path.join(__dirname, files.wechatPath, 'app.js'), f, "utf-8");
    return Promise.resolve();
}

function combine() {
    let distPath = getDistPath();
    let srcs = files.allBuildScripts.map(v => path.join(distPath, v));
    return gulp.src(srcs)
        // .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(distPath, 'js')))
}

function babelAll() {
    let distPath = getDistPath();
    // let srcs = files.allBuildScripts.map(v => path.join(distPath, v));
    return gulp.src(path.join(distPath, 'js/app.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path.join(distPath, 'js/babel')))
}

function appendVersion(str) {
    return str + "?v=" + getTimeStamp();
}


// gulp.task("build", gulp.series(build, combine, babelAll, html));
gulp.task("build", gulp.series(configHtml5, build, html));
gulp.task("buildwx", gulp.series(configWx, build, wechat));

gulp.task("publish", gulp.series(publish2, build, htmlPublish));