var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var es6ify = require('es6ify');
var plumber = require('gulp-plumber');
var tap        = require("gulp-tap");
var gutil      = require('gulp-util');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');


//script to not need to require
/*var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});*/

var dest = 'src/'; 

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
 

gulp.task('serve', ['sass', 'renderjs'], function() {

    browserSync.init({
        browser: "chrome",
        server: "./app",
        port: 3000
        
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/**/*.php").on('change', browserSync.reload); 
    gulp.watch("assets/**/*").on("change", browserSync.reload);
    gulp.watch("src/react/**/*.js", ['renderjs']);  
     gulp.watch("src/react/**/*.jsx", ['renderjs']);  
     
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});



 

var dest = "assets/";

function build2(){
    return gulp.src("src/react/main.js")
    .pipe(plumber())
    .pipe(tap(
        function(file)
        {
            var d = require('domain').create();
            d.on("error",
                function(err){
                    gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
                      gutil.beep();
                }
            );
            
            d.run(function(){
               file.contents = browserify({
                   entries: [file.path],
                   transform: [babelify.configure({
                       presets: ['react', 'es2015'],
                       plugins: ['transform-es2015-modules-commonjs']
                   })],
                   debug: true
               }).bundle();
            });
        }
    ))
    //.pipe(streamify(uglify() ) )
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
};

gulp.task('renderjs', build2);


gulp.task('default', ['serve']);