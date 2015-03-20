var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tagVersion = require('gulp-tag-version');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var spawn = require('child_process').spawn;
var mocha = require('gulp-spawn-mocha');
var runSequence = require('run-sequence');

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */
function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tagVersion({'prefix':''}));
}

gulp.task('patch', function() {
  return inc('patch');
});

gulp.task('feature', function() {
  return inc('minor');
});

gulp.task('release', function() {
  return inc('major');
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('test', function() {
  return gulp
    .src(['test/*.js'])
    .pipe(mocha({
      env: {'NODE_ENV': 'test'}
    }));
});

gulp.task('npm', function(done) {
  spawn('npm', ['publish'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('push', function() {
  git.push('origin', 'master', {args: ' --tags'}, function(err) {
    if (err) {
      throw err;
    }
  });
});

gulp.task('publish', function(callback) {
  runSequence('test',['npm', 'push'],callback);
});
