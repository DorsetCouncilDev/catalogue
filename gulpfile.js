var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var browserSync = require('browser-sync').create();

const { watch } = require('gulp');

function startNodemon() {
    const STARTUP_TIMEOUT = 5000;
    const server = nodemon({
      script: 'app.js',
      stdout: false // without this line the stdout event won't fire
    });
    let starting = false;
  
    const onReady = () => {
      starting = false;

    };
  
    server.on('start', () => {
      starting = true;
      setTimeout(onReady, STARTUP_TIMEOUT);
    });
  
    server.on('stdout', (stdout) => {
      process.stdout.write(stdout); // pass the stdout through
      if (starting) {
        onReady();
      }
    });  
  }
  function startBrowserSync(){
    browserSync.init({
      proxy: "http://BR90RWGBJ:3000",
      files: ["public/**/*.*"],
      browser: "chrome",
      port: 5000,
      open:false
    });
  }
  function reloadBroweserSync(cb){
    browserSync.reload();

}

  function compileSass(cb) {
    gulp.src('public/**/*.scss')
      .pipe(sass({
        includePaths: 'node_modules'
       }))
       .on('error', gutil.log)
      .pipe(gulp.dest('public/css'));
      return cb;
  };


  function defaultTask(cb){
    compileSass();
    startNodemon();
    startBrowserSync();
    watch('public/scss/**/*.scss',gulp.series(compileSass));
    watch('pages/*.html').on("change",reloadBroweserSync);
}

exports.default = defaultTask;

