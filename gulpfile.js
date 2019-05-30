var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var browserSync = require('browser-sync').create();

function startNodemon(done) {
    const STARTUP_TIMEOUT = 5000;
    const server = nodemon({
      script: 'app.js',
      stdout: false // without this line the stdout event won't fire
    });
    let starting = false;
  
    const onReady = () => {
      starting = false;
      done();
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
  function startBrowserSync(done){
    browserSync.init({
      proxy: "http://BR90RWGBJ:3000",
      files: ["public/**/*.*"],
      browser: "chrome",
      port: 5000,
    }, done);
  }


  gulp.task('sass', function(done) {
    gulp.src('public/scss/*.scss')
    .pipe(sass({style: 'expanded'}))
      .on('error', gutil.log)
    .pipe(gulp.dest('public/css'))
    done();
  });

  gulp.task('watch',gulp.series(['sass']),function(){
    gulp.watch('public/scss/**/*.scss',[sass]);
    gulp.watch('pages/*.html',browserSync.reload);
    browserSync.reload;
  
    
});

  gulp.task('server', gulp.series(startNodemon, startBrowserSync));
  gulp.task('default', gulp.series('server', 'watch'));