"use strict";

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    spritesmith = require('gulp.spritesmith'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    watch = require('gulp-watch'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    gcmq = require('gulp-group-css-media-queries'),
    filter = require('gulp-filter'),
    del = require('del'); // Подключаем библиотеку для удаления файлов и папок

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/',
        sprite: 'dist/css/sprite-build/'
    },
    app: {
        html: 'app/*.html',
        js: 'app/js/main.js',
        css: 'app/css/sass/main.scss',
        img: 'app/images/*.*',
        fonts: 'app/fonts/',
        sprite: 'app/images/sprite/*.png',
        spritesvg: 'app/images/sprite/*.svg',
        libsJs: 'app/js/libs/',
        libsCss: 'app/css/libs/',
        modulesJs: 'app/js/modules/*.js',
        libsIeJs: 'app/js/ie/*.js',
        firstScreenCss: 'app/css/sass/first-screen/first-screen.scss'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/*.js',
        css: 'app/css/**/**/*.scss',
        img: 'app/images/*.*',
        fonts: 'app/fonts/**/*.*',
        sprite: 'app/images/sprite/*.png',
        spritesvg: 'app/images/sprite/*.svg'
    }
};

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('mainJS', function(){
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest(path.app.libsJs))
});

gulp.task('mainCSS', function(){
    var sassFilter = filter(mainBowerFiles('**/*.+(scss|sass)'), {restore: true});
    return gulp.src(mainBowerFiles('**/*.+(css|scss|sass)'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.app.libsCss))
});

gulp.task('fontawesome', function(){
    return gulp.src(mainBowerFiles('**/*.+(otf|eot|svg|ttf|woff|woff2)'))
        .pipe(gulp.dest(path.app.fonts));
});

gulp.task('html:dist', function (){
    return gulp.src(path.app.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('js:dist', function (){
    return gulp.src(path.app.js)
/*        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())*/
        .pipe(gulp.dest(path.dist.js));
});
gulp.task('js:compressLibs', ['mainJS'], function() {
    return gulp.src([
        path.app.libsJs +'jquery.js',
        path.app.libsJs + 'jquery.textillate.js',
        path.app.libsJs + 'TweenMax.js',
        path.app.libsJs + 'ScrollMagic.js',
        path.app.libsJs + '*.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
});
gulp.task('js:compressIeLibs', function() {
    return gulp.src([path.app.libsIeJs])
        .pipe(concat('ie.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('css:dist', function () {
    return gulp.src(path.app.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(csscomb('.csscomb.json'))
        .pipe(gcmq())
/*        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))*/
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(notify("Done!"));
});

gulp.task('css:compressLibs', ['mainCSS'], function() {
    return gulp.src([path.app.libsCss + '*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css));
});

/* Compress Css for page speed */
gulp.task('css:compressFirst', function () {
    return gulp.src(path.app.firstScreenCss)
        .pipe(debug())
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(csscomb('.csscomb.json'))
        .pipe(gcmq())
        .pipe(gulp.dest(path.dist.css));
});
gulp.task('css:compress', function () {
    return gulp.src(path.app.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(csscomb('.csscomb.json'))
        .pipe(gcmq())
        .pipe(gulp.dest(path.app.libsCss))
        .pipe(notify("Done!"));
});
gulp.task('css:compressAll', ['mainCSS','css:compress','css:compressFirst'], function() {
    return gulp.src([
        path.app.libsCss + '*.css',
        path.app.libsCss +'main.css'
    ])
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.css));
});
/* Compress Css */

gulp.task('image:dist', function () {
    return gulp.src(path.app.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:dist', ['fontawesome'], function(){
    return gulp.src(path.app.fonts + '**/*.*')
        .pipe(gulp.dest(path.dist.fonts));
});

//sprite
gulp.task('sprite', function (){
    var spriteData = gulp.src(path.app.sprite).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'spriter.scss',
        cssFormat: 'css',
        imgPath: '../images/sprite.png',
        padding: 5
    }));
    return spriteData.pipe(gulp.dest('app/css/sass/svg/symbol/'));
});

gulp.task('spriteImgTransfer', function () {
    return gulp.src('app/css/sass/svg/symbol/*.png')
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('spritesvgBuild', function (){
    return gulp.src(path.app.spritesvg)
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg",
                    render: {
                        scss: {
                            dest:'sprite-svg.scss',
                            template: "app/css/sass/templates/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest('app/css/sass/svg'));
});

gulp.task('spritesvgTransfer', function () {
    return gulp.src('app/css/sass/svg/symbol/*.svg')
        .pipe(gulp.dest(path.dist.sprite));
});

gulp.task('spritesvg', ['spritesvgTransfer','spritesvgBuild'], function () {
    return gulp.src('app/css/sass/svg/symbol/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dist.sprite));
});

gulp.task('dist', [
    'clean',
    'mainJS',
    'mainCSS',
    'js:dist',
    'js:compressLibs',
    'js:compressIeLibs',
    'fonts:dist',
    'image:dist',
    'sprite',
    'spritesvg',
    'spriteImgTransfer',
    'css:dist',
    'css:compressLibs',
    'css:compressAll',//compress
    'html:dist'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb){
        gulp.start('html:dist');
    });
    watch([path.watch.js], function(event, cb){
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb){
        gulp.start('image:dist');
    });
/*    watch([path.watch.fonts], function(event, cb){
        gulp.start('fonts:dist');
    });*/
    watch([path.watch.css], function(event, cb){
        setTimeout(function(){
            gulp.start('css:dist');
            gulp.start('css:compressAll');
        },200);
    });
    watch([path.watch.sprite], function(event, cb){
        gulp.start('sprite');
        gulp.start('spriteImgTransfer');
    });
    watch([path.watch.spritesvg], function(event, cb){
        gulp.start('spritesvg');
    });
    watch(['bower_components'], function(event, cb){
        gulp.start('mainJS');
        gulp.start('mainCSS');
    });
});


gulp.task('default', ['dist', 'watch']);