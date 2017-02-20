var GulpExcalibur = (function(){
    var Package = {
      gulp: require('gulp'),
      pug: require('gulp-pug'),
      stylus: require('gulp-stylus'),
      nib: require('nib'),
      minify: require('gulp-minify-css'),
      plumber: require('gulp-plumber'),
      fs: require('fs')
    };

    var RegisterTasks = function(taskName, func){
      Package.gulp.task(taskName, func);
    };

    var TaskManager = {
      pug: function(){
        return Package.gulp.src(['./pug/*.pug'])
          .pipe(Package.plumber())
          .pipe(Package.pug({pretty: true}))
          .pipe(Package.gulp.dest('./dist/html/'))
      },
      stylus: function(){
        return Package.gulp.src(['./stylus/*.styl'])
          .pipe(Package.plumber())
          .pipe(Package.stylus({compless: true, use: [Package.nib()]}))
          .pipe(Package.gulp.dest('./dist/css/'))
      },
      default: function(){
        Package.gulp.watch('./pug/*.pug', ['pug']);
        Package.gulp.watch('./stylus/*.styl', ['stylus']);
      }
    };

    var _init = function(){
      RegisterTasks('pug', TaskManager.pug);
      RegisterTasks('stylus', TaskManager.stylus);
      RegisterTasks('default', TaskManager.default);
    }

    return {
      init: _init
    }

})();

GulpExcalibur.init();
