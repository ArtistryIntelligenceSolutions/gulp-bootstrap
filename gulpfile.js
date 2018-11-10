// Core
var gulp = require("gulp");
// PUG
var pug = require("gulp-pug");
// SASS
var sass = require("gulp-sass");
// Typescript
var ts = require("gulp-typescript");
// Automatic Browser Refresh
var browserSync = require("browser-sync").create();
// Concat CSS & JS
var useref = require("gulp-useref");
// JS Files
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
// CSS Files
var cssnano = require("gulp-cssnano");
// Image Optimization
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
// Cleaning Files
var del = require("del");
// Run gulp watch task sequentially
var runSequence = require("run-sequence");

/* Gulp Test
   ---------------------- */
gulp.task("test", function() {
  console.log("Gulp is running");
});

/* Development Tasks
   ---------------------- */
gulp.task("pug", function buildHTML() {
  return gulp.src("app/pug/**/*.pug")
    .pipe(pug({
      doctype: "html"
    }))
    .pipe(gulp.dest("dist"))
});
   
gulp.task("sass", function(){
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("js",function() {
  return gulp.src("app/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("ts",function() {
  return gulp.src("app/ts/**/*.ts")
    .pipe(ts({
        noImplicitAny: true
    }))
    .pipe(gulp.dest("dist/js"))
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  })
});

/* Optimization Tasks
   ---------------------- */
gulp.task("useref", function() {
  return gulp.src("app/**/*.html")
    .pipe(useref())
    .pipe(gulp.dest("dist"))
});

gulp.task("useref", function() {
  return gulp.src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"))
});

gulp.task("images", function() {
  return gulp.src("app/images/**/*.+(png|jpg|gif|svg)")
  .pipe(cache(imagemin({
    // Setting interlaced to true
    interlaced: true
  })))
  .pipe(gulp.dest("dist/images"))
});

// Copy Fonts to Dist.
gulp.task("fonts", function() {
  return gulp.src("app/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
});

// Cleaning Files
gulp.task("clean:dist", function() {
  return del.sync("dist");
});

/* Build Sequence
   ---------------------- */
gulp.task("build", function(callback) {
  runSequence("clean:dist", 
    ["sass", "pug", "ts", "useref", "images", "fonts"],
    callback
  )
})

gulp.task("default", function(callback) {
  runSequence(["sass", "pug", "ts", "browserSync", "watch"],
    callback
  )
})

/* Watch
   ---------------------- */
gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("app/pug/**/*.pug", ["pug"]);
  gulp.watch("app/ts/**/*.ts", ["ts"]);
  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/**/*html", browserSync.reload);
  gulp.watch("app/js/**/*.js", ["js"]);
});